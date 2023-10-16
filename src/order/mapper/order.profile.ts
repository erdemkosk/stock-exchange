import {
  Mapper,
  createMap,
  forMember,
  ignore,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateOrderDto, ReadOrderDto, UpdateOrderDto } from '../dto';
import { Order } from '../entities/order.entity';

@Injectable()
export class OrderProfile extends AutomapperProfile {
  constructor(@InjectMapper() protected readonly mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        Order,
        ReadOrderDto,
        forMember(
          (destination) => destination.id,
          mapFrom((source) => source.id),
        ),
        forMember(
          (destination) => destination.count,
          mapFrom((source) => source.count),
        ),
        forMember(
          (destination) => destination.stockId,
          mapFrom((source) => source.stock.id),
        ),
        forMember(
          (destination) => destination.userId,
          mapFrom((source) => source.user.id),
        ),
      );
    };
  }
}
