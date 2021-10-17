import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { PublisherType } from '.prisma/client';

export class PatchPublisherDto {
  @ApiProperty({
    minLength: 3,
    maxLength: 150,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(3, 150)
  readonly displayName?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsEnum(PublisherType)
  readonly type?: PublisherType;
}
