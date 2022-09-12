import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Irequest } from 'src/utils/types';
import { Topic } from '../topic.schema';
import { TopicsService } from '../topics.service';

@Injectable()
export class TopicUniqueGuard implements CanActivate {
  constructor(private readonly topicsService: TopicsService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const { body }: Irequest<Topic> = context
      .switchToHttp()
      .getRequest();

    const title = await this.topicsService.findOneByQuery({ title: { $eq: body.title } })
    if (title) {
      throw new HttpException('Title already exist', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return true;
  }
}
