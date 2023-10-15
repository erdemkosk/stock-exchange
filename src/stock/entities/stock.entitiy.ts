import { AbstractEntity } from 'src/common/entities';
import { Entity, Column } from 'typeorm';

@Entity()
export class Stock extends AbstractEntity<Stock> {
  @Column({ nullable: false, unique: true })
  symbol: string;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}
