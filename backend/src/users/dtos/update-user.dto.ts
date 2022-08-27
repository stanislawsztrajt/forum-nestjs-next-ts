import { ArrayMaxSize, IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(4)
  username: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(50)
  email: string

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @MinLength(4)
  password: string

  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(20)
  role: string[]
}