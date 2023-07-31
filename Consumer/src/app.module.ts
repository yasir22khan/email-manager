import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { MessageConsumer } from './message.consumer';
import { MessageGateway } from './message/message.gateway';

@Module({
  imports: [KafkaModule],
  controllers: [AppController],
  providers: [AppService, MessageGateway, MessageConsumer],
})
export class AppModule {}
