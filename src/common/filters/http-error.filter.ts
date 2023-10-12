import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { PinoLogger } from 'nestjs-pino';
import { ERROR_MESSAGES } from '../constants';

import { CustomException, ValidationException } from '../exception';

import { QueryFailedException } from '../exception/query.exception';

const createCustomErrorResponse = (exception: CustomException) => {
  const error = exception?.constructor?.name;
  const { code, status, statusCode, message, data, errorData }: any = exception;

  return {
    code,
    status,
    statusCode,
    error,
    message,
    data,
    errorData,
  };
};

const createValidationErrorForResponse = (exception: ValidationException) => {
  const { code, error } = ERROR_MESSAGES.VALIDATION;
  const { constraints, property }: any = exception.getResponse();

  const rawConstraints = constraints
    ? Object.values(constraints)?.filter((obj) => obj)
    : [];

  const message: string = rawConstraints.join(', ');
  const details: { messages: any; path: string } = {
    messages: rawConstraints,
    path: property,
  };

  return {
    code,
    error,
    message,
    details,
  };
};

const createQueryFailedErrorResponse = (exception: QueryFailedException) => {
  const { code, error } = ERROR_MESSAGES.QUERY;
  const { driverError, message, status }: any = exception;

  if (
    typeof driverError.detail === 'string' &&
    driverError.detail.includes('already exists')
  ) {
    const messageStart = driverError.table.split('_').join(' ') + ' with';

    return {
      code,
      error,
      status,
      message: driverError.detail.replace('Key', messageStart),
    };
  }

  return {
    code,
    error,
    status,
    message,
  };
};

const createUnknownErrorResponse = (exception: HttpException) => {
  const { code, error, message } = ERROR_MESSAGES.UNKNOWN;
  const { message: detail, stack, status, statusCode }: any = exception;

  return {
    code,
    error,
    status,
    statusCode,
    message,
    detail,
    stack,
  };
};

const getOutputForError = (exception: unknown) => {
  if (exception instanceof CustomException) {
    return createCustomErrorResponse(exception as unknown as CustomException);
  }

  if (exception instanceof ValidationException) {
    return createValidationErrorForResponse(
      exception as unknown as ValidationException,
    );
  }

  if (exception instanceof QueryFailedException) {
    return createQueryFailedErrorResponse(
      exception as unknown as QueryFailedException,
    );
  }

  return createUnknownErrorResponse(exception as HttpException);
};

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
  constructor(private readonly logger: PinoLogger) {}
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response: Response = ctx?.getResponse<Response>();
    const output = getOutputForError(exception);

    let status: HttpStatus;
    if (exception instanceof HttpException) {
      status =
        (exception as HttpException)?.getStatus() ||
        HttpStatus.INTERNAL_SERVER_ERROR;
    } else {
      status =
        exception?.status ||
        exception?.statusCode ||
        HttpStatus.INTERNAL_SERVER_ERROR;
    }

    response.status(status);
    response.json(output);

    this.logger.error({ ...output, status }, 'HttpExceptionsFilter catch');
  }
}
