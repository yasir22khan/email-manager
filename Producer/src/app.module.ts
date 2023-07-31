import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule as EnvConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: process.env.KAFKA_NAME,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: process.env.KAFKA_CLIENT_ID,
            brokers: [process.env.BROKER_IP],
            ssl: false,
          },
          producer: {
            allowAutoTopicCreation: true,
          },
        },
      },
    ]),
    EnvConfigModule.forRoot(),
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
  ],
})
export class AppModule {}
