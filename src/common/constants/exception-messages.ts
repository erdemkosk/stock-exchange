import { ExceptionMessageType } from '../types';

export const ExceptionMessages: ExceptionMessageType = {
  UserFoundException: {
    code: 10000,
    message: {
      en: 'User not found with given id',
      tr: 'Girilen idye uygun Kullanıcı kaydi yok',
    },
  },
};
