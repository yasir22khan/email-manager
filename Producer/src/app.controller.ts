import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('app')
export class AppController {
  constructor(
    @Inject(process.env.KAFKA_NAME) private readonly client: ClientKafka,
  ) {}

  @Get('send/:emailCounter')
  async sendEmail(@Param('emailCounter') emailCounter): Promise<any> {
    this.emailProducer(emailCounter);
    return emailCounter;
  }

  private emailProducer(input: number) {
    const messageData = [...Array(input).keys()].map((val) => ({
      name: `Message${val}`,
    }));
    messageData.forEach((val, index: number) => {
      this.client.emit(process.env.KAFKA_TOPIC1, {
        key: `${index}`,
        value: JSON.stringify(val),
      });
    });
  }
}
