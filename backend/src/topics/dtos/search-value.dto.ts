import { IsString, MaxLength } from 'class-validator';

export class SearchValueDto {
  @IsString()
  @MaxLength(500)
  value: string;
}
