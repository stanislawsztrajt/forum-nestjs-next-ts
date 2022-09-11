import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateReplyDto } from './dtos/create-topic.dto';
import { UpdateReplyDto } from './dtos/update-topic.dto';
import { Reply, ReplyDocument } from './reply.schema';

@Injectable()
export class RepliesService {
  constructor(
    @InjectModel(Reply.name) private replyModel: Model<ReplyDocument>,
  ) {}

  async findAll(): Promise<Reply[]> {
    return await this.replyModel.find().sort({ _id: -1 });
  }

  async findAllByQuery(query: FilterQuery<Reply>): Promise<Reply[]> {
    return await this.replyModel.find(query).sort({ _id: -1 });
  }

  async findOneById(id: string): Promise<Reply> {
    return await this.replyModel.findById(id);
  }

  async findOneByQuery(query: FilterQuery<Reply>): Promise<Reply> {
    return await this.replyModel.findOne(query);
  }

  async create(createReplyDto: CreateReplyDto): Promise<Reply> {
    return await this.replyModel.create(createReplyDto);
  }

  async update(id: string, updateReplyDto: UpdateReplyDto): Promise<Reply> {
    return await this.replyModel.findByIdAndUpdate(id, updateReplyDto);
  }

  async delete(id: string): Promise<Reply> {
    return await this.replyModel.findByIdAndDelete(id);
  }
}
