import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DateInterceptor } from './interceptors/date.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 允许跨域
  app.enableCors();
  // 全局pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  // 全局interceptors
  app.useGlobalInterceptors(new DateInterceptor());
  await app.listen(3000);
}

bootstrap();
