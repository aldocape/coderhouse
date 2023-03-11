import config from './config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forRoot(config.MONGO_ATLAS_SRV, { retryAttempts: 3 }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
