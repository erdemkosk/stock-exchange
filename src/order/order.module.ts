import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { StockModule } from 'src/stock/stock.module';
import { UserModule } from 'src/user/user.module';
import { OrderProfile } from './mapper/order.profile';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), UserModule, StockModule],
  controllers: [OrderController],
  providers: [OrderService, OrderProfile],
})
export class OrderModule {}
