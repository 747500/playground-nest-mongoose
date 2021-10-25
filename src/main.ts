import { NestFactory } from '@nestjs/core';
import {
  FastestValidatorExceptionFilter,
  FastestValidatorPipe,
} from 'fastest-validator-nestjs';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new FastestValidatorPipe());
  app.useGlobalFilters(
    new FastestValidatorExceptionFilter({
      showStack: false,
    }),
  );

  await app.listen(3000);
}
bootstrap();
