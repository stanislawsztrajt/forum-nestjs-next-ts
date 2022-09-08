import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Topic, TopicSchema } from './topic.schema';
import { JwtModule } from '@nestjs/jwt';
import { SetCreatedAtMiddleware } from 'src/middlewares/set-created-at-date.middleware';
import { SetUpdatedAtMiddleware } from 'src/middlewares/set-updated-at-date.middleware';
import { SetOwnerIdMiddleware } from 'src/middlewares/set-owner-id.middleware';
import { ConfigModule } from '@nestjs/config';
import { Reply, ReplySchema } from 'src/replies/reply.schema';
import { GenerateSlugMiddleware } from './middlewares/generate-slug.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([
      { name: Topic.name, schema: TopicSchema },
      { name: Reply.name, schema: ReplySchema },
    ]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [TopicsController],
  providers: [TopicsService],
})
export class TopicsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        SetCreatedAtMiddleware,
        SetUpdatedAtMiddleware,
        SetOwnerIdMiddleware,
        GenerateSlugMiddleware,
      )
      .forRoutes({ path: 'topics', method: RequestMethod.POST })

      .apply(SetUpdatedAtMiddleware, GenerateSlugMiddleware)
      .forRoutes({ path: 'topics/:id', method: RequestMethod.PATCH });
  }
}
