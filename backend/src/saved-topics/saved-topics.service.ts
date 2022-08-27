import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SavedTopic, SavedTopicDocument } from './saved-topic.schema';

@Injectable()
export class SavedTopicsService {
  constructor(
    @InjectModel(SavedTopic.name) private savedTopicModel: Model<SavedTopicDocument>,
  ) {}
}
