import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Post as PostModel } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(@Query() { take, skip }): Promise<PostModel[]> {
    return this.postsService.findAll({ take, skip });
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<PostModel> {
    return this.postsService.findOne(parseInt(id));
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<PostModel> {
    return this.postsService.create(createPostDto);
  }
}
