import { OnEvent } from '@nestjs/event-emitter';

import { MailAdapter } from '../adapter/mail.adapter';

export class MailEventHandler {
  @OnEvent('user.created')
  welcomeToTheUser(mailAdapter: MailAdapter) {
    console.log(
      '!!!!!!!!!!!!!!!!!!!!!!!!! Welcome mail will send this ' +
        mailAdapter.email,
    );
  }
}
