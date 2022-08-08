import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Cars } from './cars/cars.dto';

@Controller('cars')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getHello(@Query() queryParam) {
    // return this.appService.getHello();
    
    return  this.appService.getCars(queryParam);
  };

  @Post('add')
  addCar(@Body() car: Cars, @Query() queryParam){
    this.appService.addCars(car);
    
  }

  @Get('all')
  getAllCars(){
    return this.appService.getCars({});
  }


}
