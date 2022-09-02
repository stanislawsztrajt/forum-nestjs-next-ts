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
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
import { OwnerGuard } from 'src/auth/guards/owner.guard';
import { CreateSavedTopicDto } from './dtos/create-saved-topic.dto';
import { SavedTopic } from './saved-topic.schema';

@Controller('saved-topics')
export class SavedTopicsController {
  constructor(private readonly savedTopicsService: SavedTopicsService) {}

  @Get()
  async getAll(): Promise<SavedTopic[]> {
    return await this.savedTopicsService.findAll();
  }

  @UseGuards(AuthenticationGuard)
  @Post()
  async create(
    @Body() createSavedTopicDto: CreateSavedTopicDto,
  ): Promise<SavedTopic> {
    return await this.savedTopicsService.create(createSavedTopicDto);
  }

  @UseGuards(AuthenticationGuard)
  @UseGuards(OwnerGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<SavedTopic> {
    return this.savedTopicsService.delete(id);
  }
}
