import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Cars } from './cars/cars.dto';
MulterModule.register({
  dest: './upload',
})

@Controller('cars')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  getCars(@Query() queryParam) {
    return  this.appService.getCars(queryParam);
  };

  @Post('add')
  @ApiConsumes('multipart/form-data')
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       comment: { type: 'string' },
  //       outletId: { type: 'integer' },
  //       file: {
  //         type: 'string',
  //         format: 'binary',
  //       },
  //     },
  //   },
  // })
  @UseInterceptors(FileInterceptor('file'))
  addCar(@Body() car: Cars, @Query() queryParam, @UploadedFile() file: Express.Multer.File){
    return this.appService.addCars(car); 
  }
  
  @Delete('delete/:id')
  deleteCar( @Param('id') id){
    
    this.appService.deleteCar(id);
  }

  @Put('put/:id')
  updateCar(@Param('id') id, @Body() car: Cars) {
    // console.log(id, car);
    this.appService.updateCar(id, car);
  }
}
