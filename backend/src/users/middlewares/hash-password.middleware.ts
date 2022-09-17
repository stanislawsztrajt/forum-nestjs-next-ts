import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcrypt';
import { Iuser } from '../types';
import { saltOrRounds } from '../../utils/constants/bcrypt';

interface Irequest<T> extends Request {
  body: T;
  token: string;
}

@Injectable()
export class HashPassword implements NestMiddleware {
  use(req: Irequest<Iuser>, res: Response, next: NextFunction) {
    req.body.password = bcrypt.hashSync(req.body.password, saltOrRounds);
    next();
  }
}
