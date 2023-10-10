import { BaseEntity } from 'src/common/entities';
import { Order } from 'src/order/entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class Stock extends BaseEntity {
  @Column({ nullable: false })
  symbol: string;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: false })
  volume: number;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @ManyToMany(() => User, (user) => user.stocks)
  users: User[];
}
