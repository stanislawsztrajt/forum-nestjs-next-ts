import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OwnerGuard } from 'src/auth/guards/owner.guard';
import { Reply } from 'src/replies/reply.schema';
import { CreateTopicDto } from './dtos/create-topic.dto';
import { UpdateTopicDto } from './dtos/update-topic.dto';
import { Topic } from './topic.schema';
import { TopicsService } from './topics.service';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  async getAll(): Promise<Topic[]> {
    return await this.topicsService.findAll();
  }

  @Get('user/:id')
  async getUserSavedTopics(@Param('id') id: string): Promise<Topic[]> {
    return await this.topicsService.findAllByQuery({ ownerId: { $eq: id } });
  }

  @Get(':id')
  async getOneById(@Param('id') id: string): Promise<Topic> {
    return await this.topicsService.findOneById(id);
  }

  @Get(':id/replies')
  async getTopicReplies(@Param('id') id: string): Promise<Reply[]> {
    return await this.topicsService.findTopicReplies(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTopicDto: CreateTopicDto): Promise<Topic> {
    return await this.topicsService.create(createTopicDto);
  }

  @UseGuards(OwnerGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTopicDto: UpdateTopicDto,
  ): Promise<Topic> {
    return this.topicsService.update(id, updateTopicDto);
  }

  @UseGuards(OwnerGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Topic> {
    return this.topicsService.delete(id);
  }
}
