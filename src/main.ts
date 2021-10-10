import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SetupDocumentation } from './documentation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  SetupDocumentation(app);

  app.useGlobalPipes(
    new ValidationPipe({
      // skipMissingProperties: true,
      // skipNullProperties: true,
      // skipUndefinedProperties: true,
      transform: true,
      transformOptions: {
        // excludeExtraneousValues: true,
        // exposeDefaultValues: true,
      },
    }),
  );

  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
