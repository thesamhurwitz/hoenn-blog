import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreatePublisherDto {
  @ApiProperty({
    minLength: 3,
    maxLength: 25,
  })
  @IsString()
  @Length(3, 25)
  readonly name: string;

  @ApiProperty({
    minLength: 3,
    maxLength: 150,
  })
  @IsString()
  @Length(3, 150)
  readonly displayName: string;
}
