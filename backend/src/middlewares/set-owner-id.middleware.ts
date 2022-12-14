import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response, NextFunction } from 'express';
import { Iuser } from '../users/types';
import { parseJwt } from '../utils/helpers';
import { Irequest, IrequestBodyId } from '../utils/types';

@Injectable()
export class SetOwnerIdMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}

  use(req: Irequest<IrequestBodyId>, res: Response, next: NextFunction) {
    const token: string = parseJwt(req.headers.authorization);
    const { _id }: Iuser = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
    req.body.ownerId = _id;

    next();
  }
}
