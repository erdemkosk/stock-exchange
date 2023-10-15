import { AutoMap } from '@automapper/classes';
import { AbstractEntity } from 'src/common/entities';
import { Order } from 'src/order/entities/order.entity';
import { Stock } from 'src/stock/entities/stock.entitiy';
import { Entity, Column, ManyToMany, OneToMany, JoinTable } from 'typeorm';

@Entity()
export class User extends AbstractEntity<User> {
  @AutoMap()
  @Column({ nullable: false, unique: true })
  username: string;

  @AutoMap()
  @Column({ nullable: false, unique: true })
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

  @ManyToMany(() => Stock, { cascade: true })
  @JoinTable()
  tags: Stock[];

  @AutoMap()
  @OneToMany(() => Order, (order) => order.user, { cascade: true })
  @JoinTable()
  orders: Order[];
}
