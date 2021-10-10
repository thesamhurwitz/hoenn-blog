import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class PatchUserDto {
  @IsString()
  @Length(3, 25)
  @IsOptional()
  readonly username?: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @MaxLength(150)
  readonly bio?: string;
}
