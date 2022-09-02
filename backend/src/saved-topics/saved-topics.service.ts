import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateSavedTopicDto } from './dtos/create-saved-topic.dto';
import { SavedTopic, SavedTopicDocument } from './saved-topic.schema';

@Injectable()
export class SavedTopicsService {
  constructor(
    @InjectModel(SavedTopic.name)
    private savedTopicModel: Model<SavedTopicDocument>,
  ) {}

  async findAll(): Promise<SavedTopic[]> {
    return await this.savedTopicModel.find();
  }

  async findAllByQuery(query: FilterQuery<SavedTopic>): Promise<SavedTopic[]> {
    return await this.savedTopicModel.find(query);
  }

  async create(createSavedTopicDto: CreateSavedTopicDto): Promise<SavedTopic> {
    return await this.savedTopicModel.create(createSavedTopicDto);
  }

  async delete(id: string): Promise<SavedTopic> {
    return await this.savedTopicModel.findByIdAndDelete(id);
  }
}
