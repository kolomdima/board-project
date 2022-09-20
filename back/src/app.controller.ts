import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Headers,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';
import { Cars } from './cars/cars.dto';
MulterModule.register({
  dest: './upload',
});

@Controller('cars')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getCars(@Query() queryParam) {
    return this.appService.getCars(queryParam);
  }

  @Post('add')
  @UseGuards(new AuthGuard())
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  addCar(
    @Body() car: Cars,
    @Query() queryParam,
    @UploadedFile() file: Express.Multer.File,
    @Headers() headParams,
  ) {
    return this.appService.addCars(car, headParams.token);
  }

  @Delete('delete/:id')
  @UseGuards(new AuthGuard())
  deleteCar(@Param('id') id) {
    this.appService.deleteCar(id);
  }

  @Put('put/:id')
  @UseGuards(new AuthGuard())
  updateCar(@Param('id') id, @Body() car: Cars, @Headers() headParams) {
    // console.log(id, car);
    this.appService.updateCar(id, car, headParams.token);
  }

  // testMethod(a, b) {
  //   return this.teMethod(a + b);
  // }

  // teMethod(sum) {
  //   return sum * sum;
  // }

  // isEven(num: number): boolean {
  //   return num % 2 == 0;
  // }

  // checkArray(arr) {
  //   let retArr = [];
  //   arr.forEach(element => {
  //     if (retArr.indexOf(element) < 0) {
  //       retArr.push(element);
  //     } else {
  //       retArr.splice(retArr.indexOf(element), 1);
  //     }
  //   });
  //   return retArr;
  // }
}
