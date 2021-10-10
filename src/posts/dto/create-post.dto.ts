import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString, Length } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    minLength: 1,
    maxLength: 150,
  })
  @IsString()
  @Length(1, 150)
  readonly title: string;

  @ApiProperty()
  @IsString()
  readonly content: string;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  readonly author: number;
}
