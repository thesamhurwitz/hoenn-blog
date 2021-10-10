import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { Post as PostModel } from '@prisma/client';
import { FindAllQuery } from 'src/common/query/find-all.query';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(@Query() { take, skip }: FindAllQuery): Promise<PostModel[]> {
    return this.postsService.findAll({ take, skip });
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<PostModel> {
    return this.postsService.findOne(id);
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<PostModel> {
    return this.postsService.create(createPostDto);
  }
}
