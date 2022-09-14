import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Irequest } from 'src/utils/types';
import { Iuser } from '../types';
import { UsersService } from '../users.service';

@Injectable()
export class UserUniqueGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { body }: Irequest<Iuser> = context.switchToHttp().getRequest();

    const username = await this.usersService.findOneByQuery({
      username: { $eq: body.username },
    });
    if (username) {
      throw new HttpException(
        'Username already exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const email = await this.usersService.findOneByQuery({
      email: { $eq: body.email },
    });
    if (email) {
      throw new HttpException(
        'Email already exist',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return true;
  }
}
