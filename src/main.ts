import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: 'https://take-notes-front.vercel.app/',
    credentials: true,
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
