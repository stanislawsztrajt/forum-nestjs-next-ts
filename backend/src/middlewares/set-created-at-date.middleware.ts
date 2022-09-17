import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { Irequest, IrequestBodyDates } from '../utils/types';

@Injectable()
export class SetCreatedAtMiddleware implements NestMiddleware {
  use(req: Irequest<IrequestBodyDates>, res: Response, next: NextFunction) {
    req.body.createdAt = new Date();
    next();
  }
}
