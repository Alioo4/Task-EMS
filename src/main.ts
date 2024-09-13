import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { config } from './common/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const configDocs = new DocumentBuilder()
    .setTitle('EMS')
    .setDescription('ems')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, configDocs);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors({
    origin: '*',
  });

  await app.listen(config.serverPort, () => {
    console.log(`Graphql: http://localhost:${config.serverPort}/graphql`);
    console.log(`Docs: http://localhost:${config.serverPort}/api/docs`);
  });
}
bootstrap();
