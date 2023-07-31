import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    methods: '*',
  });
  await app.listen(3000, () => {
    console.log('producer is running at 3000');
  });
}
bootstrap();
