import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entitiy';
import { StockProfile } from './mapper/stock.profile';

@Module({
  imports: [TypeOrmModule.forFeature([Stock])],
  controllers: [StockController],
  exports: [StockService],
  providers: [StockService, StockProfile],
})
export class StockModule {}
