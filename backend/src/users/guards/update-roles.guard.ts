import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { checkIsUserIsAdmin, parseJwt } from 'src/utils/helpers';
import { Irequest } from 'src/utils/types';
import { Iuser } from '../types';

@Injectable()
export class UpdateRolesGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { body, headers }: Irequest<Iuser> = context
      .switchToHttp()
      .getRequest();

    const token: string = parseJwt(headers.authorization);
    const user: Iuser = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    const isUserIsAdmin: boolean = checkIsUserIsAdmin(user.roles);

    if (!isUserIsAdmin && body.roles) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
