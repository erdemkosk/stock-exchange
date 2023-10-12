import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { QueryFailedError } from 'typeorm';
import { QueryFailedException } from '../exception/query.exception';

@Injectable()
export class QueryFailedToQueryFailedExceptionInterceptor
  implements NestInterceptor
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof QueryFailedError) {
          return throwError(new QueryFailedException(error));
        }
        return throwError(error);
      }),
    );
  }
}
