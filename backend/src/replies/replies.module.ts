import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { RepliesController } from './replies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reply, ReplySchema } from './reply.schema';
import { JwtService } from '@nestjs/jwt';
import { SetCreatedAtMiddleware } from 'src/middlewares/set-created-at-date.middleware';
import { SetUpdatedAtMiddleware } from 'src/middlewares/set-updated-at-date.middleware';
import { SetOwnerIdMiddleware } from 'src/middlewares/set-owner-id.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reply.name, schema: ReplySchema }]),
  ],
  controllers: [RepliesController],
  providers: [RepliesService, JwtService],
})
export class RepliesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        SetCreatedAtMiddleware,
        SetUpdatedAtMiddleware,
        SetOwnerIdMiddleware,
      )
      .forRoutes({ path: 'replies', method: RequestMethod.POST })

      .apply(SetUpdatedAtMiddleware)
      .forRoutes({ path: 'replies/:id', method: RequestMethod.PATCH });
  }
}
