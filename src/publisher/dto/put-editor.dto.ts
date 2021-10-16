import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PutPublisherEditorDto {
  @ApiProperty()
  @IsString()
  readonly username: string;
}
