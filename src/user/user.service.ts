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
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserNotFoundException } from 'src/common/exception/user-not-found.exception';

@Injectable()
export class UserService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly eventEmitter: EventEmitter2,
    @InjectMapper() private readonly userMapper: Mapper,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<ReadUserDto | undefined> {
    const user: User = new User(createUserDto);

    await this.entityManager.save(user);

    this.eventEmitter.emit('user.created', new MailAdapter(user.email));

    return this.userMapper.map(user, User, ReadUserDto);
  }

  async findAll(): Promise<ReadUserDto[] | undefined> {
    return this.userMapper.mapArrayAsync(
      await this.userRepository.find(),
      User,
      ReadUserDto,
    );
  }

  async findOne(id: string): Promise<ReadUserDto | undefined> {
    return this.userMapper.mapAsync(
      await this.userRepository.findOneBy({ id }),
      User,
      ReadUserDto,
    );
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ReadUserDto | undefined> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new UserNotFoundException({ id });
    }

    updateUserDto.id = id;
    const updatedUser = this.userMapper.map(updateUserDto, UpdateUserDto, User);

    return this.userMapper.mapAsync(
      await this.userRepository.save(updatedUser),
      User,
      ReadUserDto,
    );
  }

  async remove(id: string) {
    await this.userRepository.delete({ id });

    return {
      success: true,
    };
  }
}
