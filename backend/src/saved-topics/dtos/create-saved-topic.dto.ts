import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateSavedTopicDto {
  @IsNotEmpty()
  @IsMongoId()
  topicId: string;
}
