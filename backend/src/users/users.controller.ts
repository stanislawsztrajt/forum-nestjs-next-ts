import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Iuser, SerializedUser } from './types';
import { UsersService } from './users.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll (): Promise<SerializedUser[]> {
    const users = await this.usersService.findAll()
    return users.map((user: Iuser) => new SerializedUser(user))
  }

  @Get(':id')
  async getById (@Param('id') id: string): Promise<SerializedUser> {
    const user = await this.usersService.findById(id) as Iuser
    return new SerializedUser(user)
  }

  @Get('/email/:email')
  async getByEmail (@Param('email') email: string): Promise<SerializedUser> {
    const user = await this.usersService.findByEmail(email) as Iuser
    return new SerializedUser(user)
  }


  @Post()
  async create (@Body() createUserDto: CreateUserDto): Promise<SerializedUser> {
    const user = await this.usersService.create(createUserDto) as Iuser
    return new SerializedUser(user)
  }

  @Patch(':id')
  async update (
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<SerializedUser> {
    const user = await this.usersService.update(id, updateUserDto) as Iuser
    return new SerializedUser(user)
  }

  @Delete(':id')
  async delete (@Param('id') id: string): Promise<SerializedUser> {
    const user = await this.usersService.delete(id) as Iuser
    return new SerializedUser(user)
  }
}
