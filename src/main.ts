import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    maxAge: 7200, //chrome cap of 2 hrs
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT || 3005);
}
bootstrap();
