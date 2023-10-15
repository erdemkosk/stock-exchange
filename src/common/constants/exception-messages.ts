import { ExceptionMessageType } from '../types';

export const ExceptionMessages: ExceptionMessageType = {
  UserNotFoundException: {
    code: 10000,
    message: {
      en: 'User not found with given id.',
      tr: 'Girilen idye uygun Kullanıcı kaydı yok.',
    },
  },
  StockNotFoundException: {
    code: 10001,
    message: {
      en: 'Stock not found with given id.',
      tr: 'Girilen idye uygun Stock kaydı yok.',
    },
  },
};
