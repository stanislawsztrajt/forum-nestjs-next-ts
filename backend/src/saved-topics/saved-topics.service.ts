import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { Topic, TopicDocument } from '../topics/topic.schema';
import { CreateSavedTopicDto } from './dtos/create-saved-topic.dto';
import { SavedTopic, SavedTopicDocument } from './saved-topic.schema';

@Injectable()
export class SavedTopicsService {
  constructor(
    @InjectModel(SavedTopic.name)
    private savedTopicModel: Model<SavedTopicDocument>,
    @InjectModel(Topic.name)
    private topicModel: Model<TopicDocument>,
  ) {}

  async findAll(): Promise<SavedTopic[]> {
    return await this.savedTopicModel.find().sort({ _id: -1 });
  }

  async findAllUserSavedTopics(id: string) {
    const savedTopics: SavedTopic[] = await this.savedTopicModel.find({
      ownerId: id,
    });
    const savedTopicsIds: Types.ObjectId[] = savedTopics.map(
      (savedTopic) => new Types.ObjectId(savedTopic.topicId),
    );

    return this.topicModel
      .find({ _id: { $in: savedTopicsIds } })
      .sort({ _id: -1 });
  }

  async findAllByQuery(query: FilterQuery<SavedTopic>): Promise<SavedTopic[]> {
    return await this.savedTopicModel.find(query).sort({ _id: -1 });
  }

  async create(createSavedTopicDto: CreateSavedTopicDto): Promise<SavedTopic> {
    return await this.savedTopicModel.create(createSavedTopicDto);
  }

  async delete(id: string): Promise<SavedTopic> {
    return await this.savedTopicModel.findByIdAndDelete(id);
  }
}
