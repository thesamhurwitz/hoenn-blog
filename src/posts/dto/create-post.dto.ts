import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

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
  @IsString()
  readonly writer: string;

  @ApiProperty()
  @IsString({ each: true })
  @IsOptional()
  readonly categories?: string[];
}
