import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @MinLength(10)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(3000)
  @MinLength(10)
  body: string;
}
