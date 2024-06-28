import { NestFactory } from '@nestjs/core';
import { BillingModule } from './billing.module';
import { RabbitMQService } from '@app/common/rabbitmq/rabbitmq.service';

async function bootstrap() {
  const app = await NestFactory.create(BillingModule);
  const rabbitMQService = app.get<RabbitMQService>(RabbitMQService);
  app.connectMicroservice(rabbitMQService.getOptions('BILLING', false));
  await app.startAllMicroservices();
}
bootstrap();
