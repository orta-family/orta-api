import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get('ConfigService');
  await app.listen(config.get('OA_PORT') || 3000);
}
bootstrap();
