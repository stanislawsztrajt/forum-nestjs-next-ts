import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { checkIsUserIsAdmin, parseJwt } from 'src/utils/helpers';
import { Irequest } from 'src/utils/types';
import { Iuser } from '../types';
import { User, UserDocument } from '../user.schema';

@Injectable()
export class OwnerUserGuard implements CanActivate {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { headers, params }: Irequest<Iuser> = context
      .switchToHttp()
      .getRequest();

    const token: string = parseJwt(headers.authorization);
    const user: Iuser = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    const isUserIsAdmin: boolean = checkIsUserIsAdmin(user.roles);

    if (user._id !== params?.id && isUserIsAdmin) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
