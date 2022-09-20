import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Car, CarDocument } from './schemas/cars.shema';
import { ObjectId } from 'bson';
import { DefaultSerializer } from 'v8';
// import {ObjectID} from 'mongodb';
// const mongodb = require('mongodb');
import * as mongodb from 'mongodb';
@Injectable()
export class AppService {
  constructor(@InjectModel(Car.name) private carModel: Model<CarDocument>) {}
  async getCars(queryParam) {
    const findParams = {};
    for (const prop in queryParam) {
      if (prop.slice(-2) == 'To') {
        if (typeof findParams[prop.slice(0, prop.length - 2)] === 'undefined') {
          findParams[prop.slice(0, prop.length - 2)] = {
            $lte: queryParam[prop],
          };
        } else {
          findParams[prop.slice(0, prop.length - 2)]['$lte'] = queryParam[prop];
        }
      } else if (prop.slice(-4) == 'From') {
        if (typeof findParams[prop.slice(0, prop.length - 4)] === 'undefined') {
          findParams[prop.slice(0, prop.length - 4)] = {
            $gte: queryParam[prop],
          };
        } else {
          findParams[prop.slice(0, prop.length - 4)]['$gte'] = queryParam[prop];
        }
      } else {
        if (prop == '_id') {
          findParams[prop] = new mongodb.ObjectId(queryParam[prop]);
        } else {
          findParams[prop] = queryParam[prop];
        }
      }
    }
    const sortObject = {
      [queryParam.sortBy || 'createdAt']: queryParam.order || -1,
    };
    const returnObject = await this.carModel
      .find(findParams)
      .skip((queryParam.page - 1) * 8)
      .limit(8)
      .sort(sortObject);
    const size = await this.carModel.count(findParams);
    console.log(size);
    const returnMap = new Map();
    returnMap.set('objectData', returnObject);
    returnMap.set('objectSize', size);

    // return JSON.stringify(returnMap);
    return {
      data: returnObject,
      size: size,
    };
  }
  addCars(carObject, token) {
    // var jwt = require('jsonwebtoken');
    // var decoded = jwt.verify(token, 'shhhhh');
    // console.log(decoded.login);
    const car = new this.carModel(carObject);
    return car.save();
  }

  deleteCar(id) {
    const delFiltr = {};
    // const mongodb = require('mongodb');
    delFiltr['_id'] = new mongodb.ObjectId(id);

    this.carModel.deleteOne(delFiltr).exec();
  }
  updateCar(id, car, token) {
    // var jwt = require('jsonwebtoken');
    // var decoded = jwt.verify(token, 'shhhhh');
    // console.log(decoded);
    // console.log(decoded.login);
    // const mongodb = require('mongodb');
    const delFiltr = {};
    delFiltr['_id'] = new mongodb.ObjectId(id);
    console.log(car);
    this.carModel.updateOne(delFiltr, car).exec();
  }
}
