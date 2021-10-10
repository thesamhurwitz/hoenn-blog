import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class PatchPostDto {
  @IsString()
  @Length(1, 150)
  @IsOptional()
  readonly title?: string;

  @IsString()
  @IsOptional()
  readonly content?: string;

  @IsBoolean()
  @IsOptional()
  readonly published?: boolean;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  readonly author?: number;
}
