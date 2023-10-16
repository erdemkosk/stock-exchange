import { AutoMap } from '@automapper/classes';
import { AbstractEntity } from 'src/common/entities';
import { Stock } from 'src/stock/entities/stock.entitiy';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class Order extends AbstractEntity<Order> {
  @AutoMap()
  @Column({ nullable: false, type: 'numeric' })
  count: number;

  @AutoMap()
  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @AutoMap()
  @ManyToOne(() => Stock)
  stock: Stock;
}
