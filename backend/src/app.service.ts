import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hi! Check /api/users /api/topics /api/saved-topics /api/replies /api/auth';
  }
}
