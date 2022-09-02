import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, NextFunction } from 'express';
import { Iuser } from 'src/users/types';
import { parseJwt } from 'src/utils/helpers';
import { Irequest, IrequestBodyId } from 'src/utils/types';

@Injectable()
export class SetOwnerIdMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Irequest<IrequestBodyId>, res: Response, next: NextFunction) {
    const token: string = parseJwt(req.headers.authorization);
    const { _id }: Iuser = this.jwtService.verify(token);
    req.body.ownerId = _id;

    next();
  }
}
