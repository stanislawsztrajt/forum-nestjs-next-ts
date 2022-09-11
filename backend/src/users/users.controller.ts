import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { OwnerUserGuard } from './guards/owner-user.guard';
import { UpdateRolesGuard } from './guards/update-roles.guard';
import { UserUniqueGuard } from './guards/user-unique.guard';
import { SerializedUser } from './types';
import { UsersService } from './users.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(): Promise<SerializedUser[]> {
    const users = await this.usersService.findAll();
    return users.map((user) => new SerializedUser(user));
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<SerializedUser> {
    const user = await this.usersService.findById(id);
    return new SerializedUser(user);
  }

  @Get('/email/:email')
  async getByEmail(@Param('email') email: string): Promise<SerializedUser> {
    const user = await this.usersService.findByEmail(email);
    return new SerializedUser(user);
  }

  @UseGuards(UserUniqueGuard)
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<SerializedUser> {
    const user = await this.usersService.create(createUserDto);
    return new SerializedUser(user);
  }

  @UseGuards(UserUniqueGuard)
  @UseGuards(UpdateRolesGuard)
  @UseGuards(OwnerUserGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<SerializedUser> {
    const user = await this.usersService.update(id, updateUserDto);
    return new SerializedUser(user);
  }

  @UseGuards(OwnerUserGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<SerializedUser> {
    const user = await this.usersService.delete(id);
    return new SerializedUser(user);
  }
}
