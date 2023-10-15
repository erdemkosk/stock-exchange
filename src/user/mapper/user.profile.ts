import {
  Mapper,
  createMap,
  forMember,
  ignore,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateUserDto, ReadUserDto, UpdateUserDto } from '../dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserProfile extends AutomapperProfile {
  constructor(@InjectMapper() protected readonly mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
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
      createMap(
        mapper,
        UpdateUserDto,
        User,
        forMember(
          (destination) => destination.email,
          mapFrom((source) => source.email),
        ),
        forMember(
          (destination) => destination.id,
          mapFrom((source) => source.id),
        ),
        forMember(
          (destination) => destination.password,
          mapFrom((source) => source.password),
        ),
        forMember(
          (destination) => destination.username,
          mapFrom((source) => source.username),
        ),
      );
    };
  }
}
