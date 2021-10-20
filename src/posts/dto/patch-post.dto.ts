import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class PatchPostDto {
  @ApiProperty({
    minLength: 1,
    maxLength: 150,
    required: false,
  })
  @IsString()
  @Length(1, 150)
  @IsOptional()
  readonly title?: string;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly content?: string;

  @ApiProperty({
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  readonly published?: boolean;

  @ApiProperty({
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly writer?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString({ each: true })
  readonly categories?: string[];
}
