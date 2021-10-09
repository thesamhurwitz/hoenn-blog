import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  ExpressSwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export function SetupDocumentation(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Hoenn Blog')
    .setDescription('Hoenn Blog API description')
    .setVersion('1.0')
    // .addTag('blog')
    .build();

  const options: SwaggerDocumentOptions = {};
  const customOptions: ExpressSwaggerCustomOptions = {
    customSiteTitle: 'Hoenn Blog API Documentation',
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('docs', app, document, customOptions);
}
