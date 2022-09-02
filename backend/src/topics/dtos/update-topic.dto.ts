import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateTopicDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @MinLength(10)
  title: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(3000)
  @MinLength(10)
  body: string;
}
