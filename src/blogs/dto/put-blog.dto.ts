import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PutBlogEditorDto {
  @ApiProperty()
  @IsString()
  readonly username: string;
}
