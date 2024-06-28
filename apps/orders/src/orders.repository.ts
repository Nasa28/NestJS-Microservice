import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { BaseAbstractRepostitory } from '@app/common/repositories/base/base.repository';
import { OrderRepositoryInterface } from './interfaces/order.interface';

export class OrderRepository
  extends BaseAbstractRepostitory<Order>
  implements OrderRepositoryInterface
{
  
  constructor(
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
  ) {
    super(orderRepository);
  }
}
