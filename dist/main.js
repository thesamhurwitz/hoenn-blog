"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const documentation_1 = require("./documentation");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true,
    });
    (0, documentation_1.SetupDocumentation)(app);
    await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map