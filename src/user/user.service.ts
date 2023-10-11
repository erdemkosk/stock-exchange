import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { ReadUserDto } from './dto';

import { MailAdapter } from './event/adapter/mail.adapter';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UserService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly eventEmitter: EventEmitter2,
    @InjectMapper() private readonly userMapper: Mapper,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user: User = new User(createUserDto);

    this.eventEmitter.emit('user.created', new MailAdapter(user.email));

    return this.userMapper.mapAsync(
      await this.entityManager.save(user),
      User,
      ReadUserDto,
    );
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
