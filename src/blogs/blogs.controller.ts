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
import { CreateBlogDto } from './dto/create-blog.dto';
import { PatchBlogDto } from './dto/patch-blog.dto';
import { PutBlogEditorDto } from './dto/put-blog.dto';
import { BlogsService as BlogsService } from './blogs.service';

@ApiTags('blogs')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  // Blogs

  @Get()
  async findAll(@Query() { take, skip }: FindAllQuery) {
    return this.blogsService.findAll({ take, skip });
  }

  @Get(':name')
  async findOne(@Param('name') name: string) {
    return this.blogsService.findOne(name);
  }

  @Post()
  async create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogsService.create(createBlogDto);
  }

  @Patch(':name')
  async patch(@Param('name') name: string, @Body() patchBlogDto: PatchBlogDto) {
    return this.blogsService.patch(name, patchBlogDto);
  }

  @Delete(':name')
  async delete(@Param('name') name: string) {
    return this.blogsService.delete(name);
  }

  @Get(':name/posts')
  async findAllPosts(
    @Param('name') name: string,
    @Query() { take, skip }: FindAllQuery,
  ) {
    return this.blogsService.findAllPosts(name, { take, skip });
  }

  // Blog's members

  // Get all blog members
  @Get(':name/editors')
  async findAllEditors(
    @Param('name') name: string,
    @Query() { take, skip }: FindAllQuery,
  ) {
    return this.blogsService.findAllEditors(name, { take, skip });
  }

  // Check if user is in this group
  @Get(':name/editors/:username')
  async findOneEditor(
    @Param('name') name: string,
    @Param('username') username: string,
  ) {
    return this.blogsService.checkUserMembership(name, username);
  }

  // Add member to blog
  @Put(':name/editors')
  async putEditor(
    @Param('name') name: string,
    @Body() putEditorDto: PutBlogEditorDto,
  ) {
    await this.blogsService.putEditor(name, putEditorDto);
  }

  @Delete(':name/editors/:username')
  async deleteEditor(
    @Param('name') name: string,
    @Param('username') username: string,
  ) {
    await this.blogsService.deleteEditor(name, username);
  }
}
