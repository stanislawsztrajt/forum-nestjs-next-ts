import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateReplyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(3000)
  @MinLength(10)
  body: string;

  @IsNotEmpty()
  @IsMongoId()
  @IsOptional()
  topicId: string;
}
