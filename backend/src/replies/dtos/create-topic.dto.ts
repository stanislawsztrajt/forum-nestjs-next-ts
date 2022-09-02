import {
  IsMongoId,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateReplyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(3000)
  @MinLength(10)
  body: string;

  @IsNotEmpty()
  @IsMongoId()
  topicId: string;
}
