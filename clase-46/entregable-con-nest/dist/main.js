"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe());
    if (process.env.NODE_ENV !== 'production') {
        const builder = new swagger_1.DocumentBuilder()
            .setTitle('Products example')
            .setDescription('The Products API')
            .setVersion('1.0')
            .addServer('http://localhost:8080', 'development server')
            .addServer('https://miapp-ecommerce.heroku.com', 'production server')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, builder);
        swagger_1.SwaggerModule.setup('/api-docs', app, document);
    }
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'views'));
    app.setViewEngine('ejs');
    await app.listen(config_1.default.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map