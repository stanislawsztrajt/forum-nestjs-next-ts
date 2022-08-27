import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.schema';
import { LoginDto } from './dtos/login.dto';
import * as bcrypt from 'bcrypt'
import { UsersService } from 'src/users/users.service';
import { Iuser } from 'src/users/types';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser ({ email, password }: LoginDto) {
    const payload: User = await this.usersService.findByEmail(email)
    const encryptedPassword: boolean = bcrypt.compareSync(password, payload.password)

    if (!payload || !encryptedPassword) {
      throw new HttpException('Email or Password is incorrect', HttpStatus.UNAUTHORIZED)
    }

    return payload
  }

  async login (loginDto: LoginDto) {
    const payload = await this.validateUser(loginDto) as Iuser
    const { password, ...result } = payload
    password
    return {
      jwt: this.jwtService.sign(result),
      user: result
    }
  }
}