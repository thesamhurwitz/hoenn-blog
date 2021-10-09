"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetupDocumentation = void 0;
const swagger_1 = require("@nestjs/swagger");
function SetupDocumentation(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Hoenn Blog')
        .setDescription('Hoenn Blog API description')
        .setVersion('1.0')
        .build();
    const options = {};
    const customOptions = {
        customSiteTitle: 'Hoenn Blog API Documentation',
    };
    const document = swagger_1.SwaggerModule.createDocument(app, config, options);
    swagger_1.SwaggerModule.setup('docs', app, document, customOptions);
}
exports.SetupDocumentation = SetupDocumentation;
//# sourceMappingURL=documentation.js.map