import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class SignupDto {
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
    minLength: 8,
    maxLength: 32,
  })
  @IsString()
  @Length(8, 32)
  readonly password: string;
}
