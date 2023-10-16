import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto, ReadOrderDto } from './dto';
import { Order } from './entities/order.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { EntityManager } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { StockService } from 'src/stock/stock.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly entityManager: EntityManager,
    @InjectMapper() private readonly orderMapper: Mapper,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userService: UserService,
    private readonly stockService: StockService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<ReadOrderDto> {
    const order = new Order();

    const [user, stock] = await Promise.all([
      this.userService.findById(createOrderDto.userId),
      this.stockService.findById(createOrderDto.stockId),
    ]);

    order.user = user;
    order.stock = stock;
    order.count = createOrderDto.count;

    const createdOrder = await this.entityManager.save(order);

    return this.orderMapper.map(createdOrder, Order, ReadOrderDto);
  }

  async findAll(): Promise<ReadOrderDto[]> {
    return this.orderMapper.mapArrayAsync(
      await this.orderRepository.find(),
      Order,
      ReadOrderDto,
    );
  }

  async findOne(id: string): Promise<ReadOrderDto> {
    return this.orderMapper.mapAsync(
      await this.orderRepository.findOneBy({ id }),
      Order,
      ReadOrderDto,
    );
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return 'test';
  }

  async remove(id: string): Promise<void> {}
}
