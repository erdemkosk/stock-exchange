import { Mapper, createMap, forMember, ignore } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateUserDto, UserDto, ReadUserDto } from '../dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() protected readonly mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, User, UserDto);
      createMap(mapper, UserDto, User);
      createMap(
        mapper,
        CreateUserDto,
        User,
        forMember((dest) => dest.id, ignore()),
      );
      createMap(
        mapper,
        User,
        ReadUserDto,
        forMember((dest) => dest.password, ignore()),
      );
    };
  }
}
