import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Car, CarSchema } from './schemas/cars.shema';
import { MulterModule } from '@nestjs/platform-express';
import { User, UserSchema } from './schemas/user.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/board'),
    MongooseModule.forFeature([
      { name: Car.name, schema: CarSchema },
      { name: User.name, schema: UserSchema },
    ]),
    MulterModule.register({ dest: './uploads' }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, AuthGuard],
})
export class AppModule {}
