import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { StockModule } from 'src/stock/stock.module';
import { UserModule } from 'src/user/user.module';
import { OrderProfile } from './mapper/order.profile';
import { KafkaModule } from 'src/bootstrap-modules/kafka/kafka.module';
import { OrderEventHandler } from './event/handler/order.handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    UserModule,
    StockModule,
    KafkaModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderProfile, OrderEventHandler],
})
export class OrderModule {}
