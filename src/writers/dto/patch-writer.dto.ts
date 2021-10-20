import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, Length } from 'class-validator';
import { WriterType } from '.prisma/client';

export class PatchWriterDto {
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
  @IsEnum(WriterType)
  readonly type?: WriterType;
}
