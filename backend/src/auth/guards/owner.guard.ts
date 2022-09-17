import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';
import { Observable } from 'rxjs';
import { Iuser } from '../../users/types';
import { checkIsUserIsAdmin, parseJwt } from '../../utils/helpers';
import { findOneByCollectionName } from '../../utils/helpers/mongoose';
import { Irequest, IrequestBodyId } from '../../utils/types';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { headers, url }: Irequest<IrequestBodyId> = context
      .switchToHttp()
      .getRequest();
    const token: string = parseJwt(headers.authorization);
    const user: Iuser = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    const isUserIsAdmin: boolean = checkIsUserIsAdmin(user.roles);

    // catching data about collection name(index 0) and collection id(index 1) from url
    // from /api/:colletion/:id
    // to [':colletion', ':id']
    const collectionData = url.split('/').slice(2, 4);
    const collection = findOneByCollectionName(
      collectionData[0].replace('-', ''),
      {
        _id: {
          $eq: new Types.ObjectId(collectionData[1]),
        },
        ownerId: {
          $eq: user._id,
        },
      },
    );

    // if a collection does not exist, a user is not an owner
    if (!collection && !isUserIsAdmin) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }
}
