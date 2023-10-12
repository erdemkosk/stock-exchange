import { HttpException, HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

export class QueryFailedException extends HttpException {
  driverError: any; // Define the driverError property

  constructor(error: QueryFailedError) {
    super(
      {
        driverError: error.driverError,
        message: error.message,
      },
      HttpStatus.BAD_REQUEST,
    );

    this.driverError = error.driverError; // Initialize the driverError property
  }
}
