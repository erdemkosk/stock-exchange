import { AutoMap } from '@automapper/classes';
import { BaseEntity } from 'src/common/entities';
import { Order } from 'src/order/entities/order.entity';
import { Stock } from 'src/stock/entities/stock.entitiy';
import { Entity, Column, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @AutoMap()
  @Column({ nullable: false })
  username: string;

  @AutoMap()
  @Column({ nullable: false })
  email: string;

  @AutoMap()
  @Column({ nullable: false })
  password: string;

  @AutoMap()
  @Column({ type: 'int', default: 0 })
  stockQuantity: number;

  @AutoMap()
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: number;

  @AutoMap()
  @ManyToMany(() => Stock, (stock) => stock.users)
  stocks: Stock[];

  @AutoMap()
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
