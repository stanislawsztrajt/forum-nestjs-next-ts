import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { Irequest, IrequestBodyDates } from 'src/utils/types';

@Injectable()
export class SetUpdatedAtMiddleware implements NestMiddleware {
  use(req: Irequest<IrequestBodyDates>, res: Response, next: NextFunction) {
    req.body.updatedAt = new Date();
    next();
  }
}
