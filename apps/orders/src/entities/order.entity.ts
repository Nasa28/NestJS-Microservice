import { Entity, Column } from 'typeorm';
import { AbstractEntity } from '@app/common/database/abstract.schema';

@Entity()
export class Order extends AbstractEntity<Order> {
  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  phoneNumber: string;

  @Column()
  quantity: number;
}
