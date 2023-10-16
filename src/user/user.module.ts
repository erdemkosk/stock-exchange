import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

import { UserProfile } from './mapper/user.profile';
import { MailEventHandler } from './event/handler/mail.handler';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService, UserProfile, MailEventHandler],
})
export class UserModule {}
