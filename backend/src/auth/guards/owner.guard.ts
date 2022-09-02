import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Iuser } from 'src/users/types';
import { parseJwt } from 'src/utils/helpers';
import { Irequest, IrequestBodyId } from 'src/utils/types';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { body, headers }: Irequest<IrequestBodyId> = context
      .switchToHttp()
      .getRequest();
    const token: string = parseJwt(headers.authorization);
    const user: Iuser = this.jwtService.verify(token);
    const isAdmin: boolean = user.roles
      .map((role) => role.toLowerCase())
      .includes('admin');

    if (user._id !== body.ownerId && !isAdmin) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    return true;
  }
}
