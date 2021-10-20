import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User as UserModel } from '@prisma/client';
import { FindAllQuery } from 'src/common/query/find-all.query';
import { CreateWriterDto } from './dto/create-writer.dto';
import { PatchWriterDto } from './dto/patch-writer.dto';
import { PutWriterEditorDto } from './dto/put-editor.dto';
import { WritersService as WritersService } from './writers.service';

@ApiTags('writers')
@Controller('writers')
export class WritersController {
  constructor(private readonly writersService: WritersService) {}

  // Writers

  @Get()
  async findAll(@Query() { take, skip }: FindAllQuery) {
    return this.writersService.findAll({ take, skip });
  }

  @Get(':name')
  async findOne(@Param('name') name: string) {
    return this.writersService.findOne(name);
  }

  @Post()
  async create(@Body() createWriterDto: CreateWriterDto) {
    return this.writersService.create(createWriterDto);
  }

  @Patch(':name')
  async patch(
    @Param('name') name: string,
    @Body() patchWriterDto: PatchWriterDto,
  ) {
    return this.writersService.patch(name, patchWriterDto);
  }

  @Delete(':name')
  async delete(@Param('name') name: string) {
    return this.writersService.delete(name);
  }

  @Get(':name/posts')
  async findAllPosts(
    @Param('name') name: string,
    @Query() { take, skip }: FindAllQuery,
  ) {
    return this.writersService.findAllPosts(name, { take, skip });
  }

  // Writer's members

  // Get all writer members
  @Get(':name/editors')
  async findAllEditors(
    @Param('name') name: string,
    @Query() { take, skip }: FindAllQuery,
  ) {
    return this.writersService.findAllEditors(name, { take, skip });
  }

  // Check if user is in this group
  @Get(':name/editors/:username')
  async findOneEditor(
    @Param('name') name: string,
    @Param('username') username: string,
  ) {
    return this.writersService.checkUserMembership(name, username);
  }

  // Add member to writer
  @Put(':name/editors')
  async putEditor(
    @Param('name') name: string,
    @Body() putEditorDto: PutWriterEditorDto,
  ) {
    await this.writersService.putEditor(name, putEditorDto);
  }

  @Delete(':name/editors/:username')
  async deleteEditor(
    @Param('name') name: string,
    @Param('username') username: string,
  ) {
    await this.writersService.deleteEditor(name, username);
  }
}
