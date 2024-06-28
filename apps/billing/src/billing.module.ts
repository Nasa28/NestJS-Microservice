import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { RabbitMQModule } from '@app/common/rabbitmq/rabbitmq.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        // RMQ_HOST: Joi.string().required(),
        // RMQ_PORT: Joi.number().required(),
        // RMQ_USER: Joi.string().required(),
        // RMQ_PASSWORD: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
        RABBITMQ_BILLING_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/billing/.env',
    }),
    RabbitMQModule,
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
