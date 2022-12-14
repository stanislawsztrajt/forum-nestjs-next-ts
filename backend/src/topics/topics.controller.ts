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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OwnerGuard } from '../auth/guards/owner.guard';
import { Reply } from '../replies/reply.schema';
import { CreateTopicDto } from './dtos/create-topic.dto';
import { UpdateTopicDto } from './dtos/update-topic.dto';
import { SearchValueDto } from './dtos/search-value.dto';
import { Topic } from './topic.schema';
import { TopicsService } from './topics.service';
import { TopicUniqueGuard } from './guards/topic-unique.guard';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  async getAll(): Promise<Topic[]> {
    return await this.topicsService.findAll();
  }

  @Get('slug/:slug')
  async getOneBySlug(@Param('slug') slug: string): Promise<Topic> {
    return await this.topicsService.findOneByQuery({ slug: { $eq: slug } });
  }

  @Post('search-by-value')
  async getAllBySearchValue(
    @Body() { value }: SearchValueDto,
  ): Promise<Topic[]> {
    return await this.topicsService.findAllByQuery({
      $or: [
        {
          title: {
            $regex: value,
            $options: 'i',
          },
        },
        {
          body: {
            $regex: value,
            $options: 'i',
          },
        },
      ],
    });
  }

  @Get('examples')
  async getAllExamples(): Promise<Topic[]> {
    return await this.topicsService.findAllExamples();
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

  @UseGuards(TopicUniqueGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTopicDto: CreateTopicDto): Promise<Topic> {
    return await this.topicsService.create(createTopicDto);
  }

  @UseGuards(TopicUniqueGuard)
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
