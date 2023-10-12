import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class CustomException extends HttpException {
  @ApiProperty({
    example: 12345,
  })
  public code: number;

  @ApiProperty({})
  public message: string;

  @ApiProperty({
    example: 400,
  })
  public statusCode: HttpStatus;

  @ApiProperty({})
  public data?: any;

  @ApiProperty({})
  public level?: any;

  @ApiProperty({})
  public errorData?: any;

  constructor(
    message: string,
    code: number,
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    data?: any,
    level?: any,
    errorData?: any,
  ) {
    super(message, statusCode);
    this.code = code;
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
    this.level = level;
    this.errorData = errorData;
  }
}

export type CustomExceptionType = CustomException;
