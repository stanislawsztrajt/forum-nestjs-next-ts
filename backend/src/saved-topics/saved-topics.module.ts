import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { SavedTopicsService } from './saved-topics.service';
import { SavedTopicsController } from './saved-topics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SavedTopic, SavedTopicSchema } from './saved-topic.schema';
import { JwtService } from '@nestjs/jwt';
import { SetCreatedAtMiddleware } from '../middlewares/set-created-at-date.middleware';
import { SetUpdatedAtMiddleware } from '../middlewares/set-updated-at-date.middleware';
import { SetOwnerIdMiddleware } from '../middlewares/set-owner-id.middleware';
import { Topic, TopicSchema } from '../topics/topic.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SavedTopic.name, schema: SavedTopicSchema },
      { name: Topic.name, schema: TopicSchema },
    ]),
  ],
  controllers: [SavedTopicsController],
  providers: [SavedTopicsService, JwtService],
})
export class SavedTopicsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        SetCreatedAtMiddleware,
        SetUpdatedAtMiddleware,
        SetOwnerIdMiddleware,
      )
      .forRoutes({ path: 'saved-topics', method: RequestMethod.POST })

      .apply(SetUpdatedAtMiddleware)
      .forRoutes({ path: 'saved-topics/:id', method: RequestMethod.PATCH });
  }
}
