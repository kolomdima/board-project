import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from './schemas/cars.shema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/board'), 
  MongooseModule.forFeature([{ name: Car.name, schema: CarSchema }]),
  MulterModule.register({ dest: './uploads' })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
