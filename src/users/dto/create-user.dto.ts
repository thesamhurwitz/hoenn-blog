import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    format: 'email',
  })
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    minLength: 3,
    maxLength: 25,
  })
  @IsString()
  @Length(3, 25)
  readonly username: string;

  @ApiProperty({
    maxLength: 150,
  })
  @IsString()
  @IsOptional()
  @MaxLength(150)
  readonly bio?: string;
}
