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
import { CreateReplyDto } from './dtos/create-topic.dto';
import { UpdateReplyDto } from './dtos/update-topic.dto';
import { RepliesService } from './replies.service';
import { Reply } from './reply.schema';

@Controller('replies')
export class RepliesController {
  constructor(private readonly repliesService: RepliesService) {}

  @Get()
  async getAll(): Promise<Reply[]> {
    return await this.repliesService.findAll();
  }

  @Get('user/:id')
  async getUserSavedTopics(@Param('id') id: string): Promise<Reply[]> {
    return await this.repliesService.findAllByQuery({ ownerId: { $eq: id } });
  }

  @Get(':id')
  async getOneById(@Param('id') id: string): Promise<Reply> {
    return await this.repliesService.findOneById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createReplyDto: CreateReplyDto): Promise<Reply> {
    return await this.repliesService.create(createReplyDto);
  }

  @UseGuards(OwnerGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReplyDto: UpdateReplyDto,
  ): Promise<Reply> {
    return this.repliesService.update(id, updateReplyDto);
  }

  @UseGuards(OwnerGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Reply> {
    return this.repliesService.delete(id);
  }
}
