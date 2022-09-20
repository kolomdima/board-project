import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DefaultSerializer } from 'v8';
import { User, UserDocument } from './schemas/user.schema';
// import {ObjectID} from 'mongodb';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async checkLogin(userParams) {
    const sha256 = require('sha256');
    userParams.password = sha256(userParams.password + 'helloiamnotarobot');
    console.log(await this.userModel.count(userParams));
    const jwt = require('jsonwebtoken');
    // var privateKey = fs.readFileSync('private.key');
    const token = jwt.sign({ login: userParams.login }, 'shhhhh');
    const size = await this.userModel.count(userParams);
    return {
      size: size,
      token: token,
    };
    // return this.userModel.find(userParams);
  }
}
