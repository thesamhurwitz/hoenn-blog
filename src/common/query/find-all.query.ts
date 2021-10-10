import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class FindAllQuery {
  @ApiProperty({
    description: 'Amount of posts to select. (Limit)',
    required: false,
    default: 20,
    minimum: 1,
    maximum: 30,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @Max(30)
  readonly take: number = 10;

  @ApiProperty({
    description: 'Amount of posts to skip. (Offset)',
    required: false,
    default: 0,
    minimum: 0,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  readonly skip: number = 0;
}
