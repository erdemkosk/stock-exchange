import { HttpStatus } from '@nestjs/common';
import {
  DEFAULT_COUNTRY_CODE,
  ExceptionMessages,
  LOGLEVEL,
} from 'src/common/constants';
import { CustomException } from './custom.exception';

export class UserFoundException extends CustomException {
  constructor(data: unknown, countryCode?: string) {
    const lang = countryCode ? countryCode : DEFAULT_COUNTRY_CODE;
    super(
      ExceptionMessages[UserFoundException.name].message[lang],
      ExceptionMessages[UserFoundException.name].code,
      HttpStatus.NOT_FOUND,
      data,
      LOGLEVEL.ERROR,
      undefined,
    );
  }
}
