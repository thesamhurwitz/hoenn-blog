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
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { PatchPublisherDto } from './dto/patch-publisher.dto';
import { PutPublisherEditorDto } from './dto/put-editor.dto';
import { PublishersService } from './publishers.service';

@ApiTags('publishers')
@Controller('publishers')
export class PublishersController {
  constructor(private readonly publishersService: PublishersService) {}

  // Publishers

  @Get()
  async findAll(@Query() { take, skip }: FindAllQuery) {
    return this.publishersService.findAll({ take, skip });
  }

  @Get(':name')
  async findOne(@Param('name') name: string) {
    return this.publishersService.findOne(name);
  }

  @Post()
  async create(@Body() createPublisherDto: CreatePublisherDto) {
    return this.publishersService.create(createPublisherDto);
  }

  @Patch(':name')
  async patch(
    @Param('name') name: string,
    @Body() patchPublisherDto: PatchPublisherDto,
  ) {
    return this.publishersService.patch(name, patchPublisherDto);
  }

  @Delete(':name')
  async delete(@Param('name') name: string) {
    return this.publishersService.delete(name);
  }

  @Get(':name/posts')
  async findAllPosts(
    @Param('name') name: string,
    @Query() { take, skip }: FindAllQuery,
  ) {
    return this.publishersService.findAllPosts(name, { take, skip });
  }

  // Publisher's members

  // Get all publisher members
  @Get(':name/editors')
  async findAllEditors(
    @Param('name') name: string,
    @Query() { take, skip }: FindAllQuery,
  ) {
    return this.publishersService.findAllEditors(name, { take, skip });
  }

  // Check if user is in this group
  @Get(':name/editors/:username')
  async findOneEditor(
    @Param('name') name: string,
    @Param('username') username: string,
  ) {
    return this.publishersService.checkUserMembership(name, username);
  }

  // Add member to publisher
  @Put(':name/editors')
  async putEditor(
    @Param('name') name: string,
    @Body() putEditorDto: PutPublisherEditorDto,
  ) {
    await this.publishersService.putEditor(name, putEditorDto);
  }

  @Delete(':name/editors/:username')
  async deleteEditor(
    @Param('name') name: string,
    @Param('username') username: string,
  ) {
    await this.publishersService.deleteEditor(name, username);
  }
}
