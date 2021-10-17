import { Role } from '.prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class PatchUserDto {
  @ApiProperty({
    format: 'email',
    required: false,
  })
  @IsString()
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @ApiProperty({
    maxLength: 150,
    required: false,
  })
  @IsString()
  @MaxLength(150)
  readonly bio?: string;

  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsEnum(Role)
  readonly role?: Role;
}
