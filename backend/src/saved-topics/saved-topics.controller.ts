import { SavedTopicsService } from './saved-topics.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OwnerGuard } from '../auth/guards/owner.guard';
import { CreateSavedTopicDto } from './dtos/create-saved-topic.dto';
import { SavedTopic } from './saved-topic.schema';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Topic } from '../topics/topic.schema';

@Controller('saved-topics')
export class SavedTopicsController {
  constructor(private readonly savedTopicsService: SavedTopicsService) {}

  @Get()
  async getAll(): Promise<SavedTopic[]> {
    return await this.savedTopicsService.findAll();
  }

  @Get('user/:id')
  async getUserSavedTopics(@Param('id') id: string): Promise<SavedTopic[]> {
    return await this.savedTopicsService.findAllByQuery({ ownerId: { $eq: id } });
  }

  @Get('topics/user/:id')
  async getUserTopics(@Param('id') id: string): Promise<Topic[]> {
    return await this.savedTopicsService.findAllUserSavedTopics(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createSavedTopicDto: CreateSavedTopicDto,
  ): Promise<SavedTopic> {
    return await this.savedTopicsService.create(createSavedTopicDto);
  }

  @UseGuards(OwnerGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<SavedTopic> {
    return this.savedTopicsService.delete(id);
  }
}
