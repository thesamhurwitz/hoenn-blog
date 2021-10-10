import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class PatchUserDto {
  @ApiProperty({
    minLength: 3,
    maxLength: 25,
    required: false,
  })
  @IsString()
  @Length(3, 25)
  @IsOptional()
  readonly username?: string;

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
  })
  @IsString()
  @MaxLength(150)
  readonly bio?: string;
}
