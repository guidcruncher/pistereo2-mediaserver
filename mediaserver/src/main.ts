declare const module: any;

import { Logger, ConsoleLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      colors: true,
      prefix: 'MediaSvr',
    }),
  });

  app.enableShutdownHooks();

  const config = new DocumentBuilder()
    .setTitle('PiStereo2 MediaServer')
    .setDescription('The PiStereoz2 MediaServer API')
    .setVersion('1.0')
    .addTag('mediaserver')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, documentFactory);

  await app.listen(process.env.PISTEREO_LISTEN_PORT ?? 3001);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}

bootstrap();
