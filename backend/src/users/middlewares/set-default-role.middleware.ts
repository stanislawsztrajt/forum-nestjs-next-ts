import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Iuser } from '../types';

interface Irequest<T> extends Request {
  body: T;
  token: string;
}

@Injectable()
export class SetDefaultRoleMiddleware implements NestMiddleware {
  use(req: Irequest<Iuser>, res: Response, next: NextFunction) {
    req.body.roles = ['User'];
    next();
  }
}
