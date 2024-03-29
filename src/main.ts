import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = await app.get(ConfigService);
  await app.listen(3000);

  // const PORT = config.get<number>('API_PORT')
  //
  //
  // await app.listen(PORT || 3000, () => console.log(`App started on port ${PORT}`));
}

bootstrap();
