import { PartialType } from '@nestjs/swagger';
import { CreateStockDto } from './create-stock.dto';
import { AutoMap } from '@automapper/classes';

export class UpdateStockDto extends PartialType(CreateStockDto) {
  @AutoMap()
  id: string;
}
