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
import { AuthenticationGuard } from 'src/auth/guards/authentication.guard';
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

  @Get(':id')
  async getOneById(@Param('id') id: string): Promise<Reply> {
    return await this.repliesService.findOneById(id);
  }

  @UseGuards(AuthenticationGuard)
  @Post()
  async create(@Body() createReplyDto: CreateReplyDto): Promise<Reply> {
    return await this.repliesService.create(createReplyDto);
  }

  @UseGuards(AuthenticationGuard)
  @UseGuards(OwnerGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateReplyDto: UpdateReplyDto,
  ): Promise<Reply> {
    return this.repliesService.update(id, updateReplyDto);
  }

  @UseGuards(AuthenticationGuard)
  @UseGuards(OwnerGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Reply> {
    return this.repliesService.delete(id);
  }
}
