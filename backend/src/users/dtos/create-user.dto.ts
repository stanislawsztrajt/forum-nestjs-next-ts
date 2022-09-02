import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(4)
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(50)
  @MinLength(4)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  @MinLength(4)
  password: string;
}
