import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Car, CarSchema } from './schemas/cars.shema';
import { User, UserSchema } from './schemas/user.schema';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
      imports: [
        MongooseModule.forRoot('mongodb://localhost/board'),
        MongooseModule.forFeature([
          { name: Car.name, schema: CarSchema },
          { name: User.name, schema: UserSchema },
        ]),
        MulterModule.register({ dest: './uploads' }),
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     jest.spyOn(appController, 'teMethod');
  //     // appController.testMethod(5, 6);
  //     expect(appController.testMethod(5, 6)).toBe(121);
  //     expect(appController.teMethod).toBeCalledWith(11);
  //     expect(appController.teMethod).toBeCalledTimes(1);
  //   });
  //   it('should check if number is even', () => {
  //     expect(appController.isEven(4)).toBe(true);
  //     expect(appController.isEven(7)).toBe(false);
  //   });
  //   it('should return new array', () => {
  //     expect(appController.checkArray([1, 2, 3, 4, 5, 6, 1, 2, 3])).toEqual([
  //       4, 5, 6,
  //     ]);
  //   });
  // });
});
