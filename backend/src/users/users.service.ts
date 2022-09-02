import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { parseResponse } from 'src/utils/helpers';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Iuser } from './types';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<Iuser[]> {
    return parseResponse(await this.userModel.find());
  }

  async findAllByQuery(query: FilterQuery<User>): Promise<Iuser[]> {
    return parseResponse(await this.userModel.find(query));
  }

  async findById(_id: string): Promise<Iuser> {
    return parseResponse(await this.userModel.findById(_id));
  }

  async findOneByQuery(query: FilterQuery<User>): Promise<Iuser> {
    return parseResponse(await this.userModel.findOne(query));
  }

  async findByEmail(email: string): Promise<Iuser> {
    return parseResponse(
      await this.userModel.findOne({ email: { $eq: email } }),
    );
  }

  async create(createUserDto: CreateUserDto): Promise<Iuser> {
    return parseResponse(await this.userModel.create(createUserDto));
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Iuser> {
    return parseResponse(
      await this.userModel.findByIdAndUpdate(id, updateUserDto),
    );
  }

  async delete(id: string): Promise<Iuser> {
    return parseResponse(await this.userModel.findByIdAndDelete(id));
  }
}
