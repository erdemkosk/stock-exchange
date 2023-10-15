export type ExceptionMessageType = {
  [exception: string]: {
    code: number;
    message: {
      [lang: string]: string;
    };
  };
};
