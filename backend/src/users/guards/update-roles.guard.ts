import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { checkIsUserIsAdmin } from 'src/utils/helpers';
import { Irequest } from 'src/utils/types';
import { Iuser } from '../types';

@Injectable()
export class UpdateRolesGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { body }: Irequest<Iuser> = context.switchToHttp().getRequest();
    console.log(2);

    if (body.roles && checkIsUserIsAdmin(body.roles)) return true;
    if (body.roles) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    return true;
  }
}
