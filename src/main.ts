import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './core/pipes/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Check In App example')
    .setDescription('The Check In App API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: 'Default',
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'defaultBearerAuth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  // global endpoints prefix
  app.setGlobalPrefix('api/v1');

  // handle all user input validation globally
  app.useGlobalPipes(new ValidateInputPipe());

  await app.listen(3000);
}
bootstrap();
