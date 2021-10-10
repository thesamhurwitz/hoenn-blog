import { Type } from 'class-transformer';
import { IsInt, IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Length(1, 150)
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsInt()
  @Type(() => Number)
  readonly author: number;
}
