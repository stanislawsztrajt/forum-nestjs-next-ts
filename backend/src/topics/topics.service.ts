import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Reply, ReplyDocument } from 'src/replies/reply.schema';
import { CreateTopicDto } from './dtos/create-topic.dto';
import { UpdateTopicDto } from './dtos/update-topic.dto';
import { Topic, TopicDocument } from './topic.schema';

@Injectable()
export class TopicsService {
  constructor(
    @InjectModel(Topic.name) private topicModel: Model<TopicDocument>,
    @InjectModel(Reply.name) private replyModel: Model<ReplyDocument>,
  ) {}

  async findAll(): Promise<Topic[]> {
    return await this.topicModel.find();
  }

  async findAllExamples(): Promise<Topic[]> {
    return await this.topicModel.find().limit(10);
  }

  async findAllByQuery(query: FilterQuery<Topic>): Promise<Topic[]> {
    return await this.topicModel.find(query);
  }

  async findTopicReplies(id: string): Promise<Reply[]> {
    return await this.replyModel.find({ topicId: { $eq: id } });
  }

  async findOneById(id: string): Promise<Topic> {
    return await this.topicModel.findById(id);
  }

  async findOneByQuery(query: FilterQuery<Topic>): Promise<Topic> {
    return await this.topicModel.findOne(query);
  }

  async create(createTopicDto: CreateTopicDto): Promise<Topic> {
    return await this.topicModel.create(createTopicDto);
  }

  async update(id: string, updateTopicDto: UpdateTopicDto): Promise<Topic> {
    return await this.topicModel.findByIdAndUpdate(id, updateTopicDto);
  }

  async delete(id: string): Promise<Topic> {
    return await this.topicModel.findByIdAndDelete(id);
  }
}
