import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { parseJwt } from '../../utils/helpers';
import { Irequest } from '../../utils/types';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const {
      headers: { authorization },
    }: Irequest<unknown> = context.switchToHttp().getRequest();
    const token: string = parseJwt(authorization);

    this.jwtService.verify(token);

    return true;
  }
}
