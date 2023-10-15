import { AbstractEntity } from 'src/common/entities';
import { Stock } from 'src/stock/entities/stock.entitiy';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class Order extends AbstractEntity<Order> {
  @Column({ nullable: false })
  shortName: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, type: 'numeric' })
  price: number;

  @Column({ nullable: false })
  volume: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Stock)
  stock: Stock;
}
