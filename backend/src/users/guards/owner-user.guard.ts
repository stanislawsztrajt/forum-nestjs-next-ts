import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { parseJwt } from 'src/utils/helpers';
import { Irequest } from 'src/utils/types';
import { Iuser } from '../types';

@Injectable()
export class OwnerUserGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { body, headers }: Irequest<Iuser> = context
      .switchToHttp()
      .getRequest();
    console.log(1);
    const token: string = parseJwt(headers.authorization);
    const user: Iuser = this.jwtService.verify(token);

    if (user._id === body._id) return true;

    return false;
  }
}
