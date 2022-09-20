import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login } from './auth/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  authLogin(@Body() userData: Login) {
    return this.authService.checkLogin(userData);
    // return {data:'token'};
  }
}
