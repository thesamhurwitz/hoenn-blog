import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PutWriterEditorDto {
  @ApiProperty()
  @IsString()
  readonly username: string;
}
