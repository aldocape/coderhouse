import config from './config';

import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  if (process.env.NODE_ENV !== 'production') {
    const builder = new DocumentBuilder()
      .setTitle('Products example')
      .setDescription('The Products API')
      .setVersion('1.0')
      .addServer('http://localhost:8080', 'development server')
      .addServer('https://miapp-ecommerce.heroku.com', 'production server')
      .build();

    const document = SwaggerModule.createDocument(app, builder);
    SwaggerModule.setup('/api-docs', app, document);
  }

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  await app.listen(config.PORT);
}
bootstrap();
