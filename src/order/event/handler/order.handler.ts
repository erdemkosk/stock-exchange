import { OnEvent } from '@nestjs/event-emitter';
import { OrderCreatedAdapter } from '../adapter/order-created.adapter';
import { Injectable } from '@nestjs/common';
import { ProducerService } from 'src/bootstrap-modules/kafka/producer.service';

@Injectable()
export class OrderEventHandler {
  constructor(private readonly producerService: ProducerService) {}
  @OnEvent('order.created')
  orderCreated(adapter: OrderCreatedAdapter) {
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!! Order Created ' + adapter.orderId);
    this.producerService
      .produce('order-created', {
        value: JSON.stringify(adapter),
      })
      .catch((err) => console.log(err));
  }
}
