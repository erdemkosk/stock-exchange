import {
  Mapper,
  createMap,
  forMember,
  ignore,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateStockDto, ReadStockDto, UpdateStockDto } from '../dto';
import { Stock } from '../entities/stock.entitiy';

@Injectable()
export class StockProfile extends AutomapperProfile {
  constructor(@InjectMapper() protected readonly mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(
        mapper,
        CreateStockDto,
        Stock,
        forMember((dest) => dest.id, ignore()),
      );
      createMap(
        mapper,
        Stock,
        ReadStockDto,
        forMember(
          (destination) => destination.name,
          mapFrom((source) => source.name),
        ),
        forMember(
          (destination) => destination.price,
          mapFrom((source) => source.price),
        ),
        forMember(
          (destination) => destination.symbol,
          mapFrom((source) => source.symbol),
        ),
      );
      createMap(
        mapper,
        UpdateStockDto,
        Stock,
        forMember(
          (destination) => destination.name,
          mapFrom((source) => source.name),
        ),
        forMember(
          (destination) => destination.id,
          mapFrom((source) => source.id),
        ),
        forMember(
          (destination) => destination.price,
          mapFrom((source) => source.price),
        ),
        forMember(
          (destination) => destination.symbol,
          mapFrom((source) => source.symbol),
        ),
      );
    };
  }
}
