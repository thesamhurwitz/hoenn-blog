import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { FindAllQuery } from 'src/common/query/find-all.query';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesService } from './categories.service';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiQuery({
    name: 'pagination',
    type: FindAllQuery,
  })
  async findAll(@Query() { take, skip }: FindAllQuery) {
    return this.categoriesService.findAll({ take, skip });
  }

  @Get('/:slug')
  async findOne(@Param('slug') slug: string) {
    return this.categoriesService.findOne(slug);
  }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Delete(':slug')
  async delete(@Param('slug') slug: string) {
    return this.categoriesService.delete(slug);
  }
}
