import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car, CarDocument } from './schemas/cars.shema';

@Injectable()
export class AppService {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {}
  getCars(queryParam) {
    
    let findParams = {};
    for(const prop in queryParam){
      // console.log(prop.slice(-2));
      // console.log(prop.slice(0, prop.length - 2));
      if (prop.slice(-2) == 'To') {
        if (typeof findParams[prop.slice(0, prop.length - 2)] === "undefined") {
        findParams[prop.slice(0, prop.length - 2)] = {$lte:queryParam[prop]}
        } else {
          findParams[prop.slice(0, prop.length - 2)]['$lte'] = queryParam[prop];
        }
      } else if (prop.slice(-4) == 'From') {
        if (typeof findParams[prop.slice(0, prop.length - 4)] === "undefined") {
          findParams[prop.slice(0, prop.length - 4)] = {$gte:queryParam[prop]}
          } else {
            findParams[prop.slice(0, prop.length - 4)]['$gte'] = queryParam[prop];
          }
      } else {
        findParams[prop] = queryParam[prop];
      }
    }
    console.log(findParams);
    return this.carModel.find(findParams);
  }
  addCars(carObject) {
    const car = new this.carModel(carObject);
    return car.save();
  }
}
