import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order-dto';
import { OrderRepository } from './orders.repository';
import { BILLING_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { EntityManager } from 'typeorm';
import { Order } from './entities/order.entity';
import { Logger } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private readonly entityManager: EntityManager,
    private readonly orderRepository: OrderRepository,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {}
  logger = new Logger('OrdersService');
  // async createOrder(request: CreateOrderDto) {
  //   return this.orderRepository.save(request);
  // }
  async createOrder(request: CreateOrderDto) {
    try {
      return await this.entityManager.transaction(
        async (transactionalEntityManager) => {
          const order = transactionalEntityManager.create(Order, request);
          const createOrder = await transactionalEntityManager.save(order);

          await lastValueFrom(
            this.billingClient.emit('order_created', { request }),
          );
          return createOrder;
        },
      );
    } catch (error) {
      this.logger.error('Failed to create order', error.stack);
      throw error;
    }
  }
  async getOrders() {
    return this.orderRepository.findAll();
  }
}
