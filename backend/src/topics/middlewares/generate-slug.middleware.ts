import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { Irequest } from '../../utils/types';
import { Topic } from '../topic.schema';

@Injectable()
export class GenerateSlugMiddleware implements NestMiddleware {
  use(req: Irequest<Topic>, res: Response, next: NextFunction) {
    req.body.slug = req.body.title
      .replaceAll(/[^\w\s]/gi, '')
      .split(' ')
      .join('-');
    next();
  }
}
