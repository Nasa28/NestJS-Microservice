import { BaseInterfaceRepository } from '@app/common/repositories/base/base.interface';
import { Order } from '../entities/order.entity';

export interface OrderRepositoryInterface
  extends BaseInterfaceRepository<Order> {}
