import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    minLength: 1,
    maxLength: 150,
  })
  @IsString()
  @Length(1, 150)
  readonly name: string;
}
