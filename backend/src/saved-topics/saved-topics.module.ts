import { Module } from '@nestjs/common';
import { SavedTopicsService } from './saved-topics.service';
import { SavedTopicsController } from './saved-topics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SavedTopic, SavedTopicSchema } from './saved-topic.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SavedTopic.name, schema: SavedTopicSchema }]),
  ],
  controllers: [SavedTopicsController],
  providers: [SavedTopicsService]
})
export class SavedTopicsModule {}
