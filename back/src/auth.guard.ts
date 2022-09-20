import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(request.headers.token, 'shhhhh');

    // return !!request.headers.token;
    // return false;
    return decoded.hasOwnProperty('login');
  }
}
