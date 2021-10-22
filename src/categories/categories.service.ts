import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateCategoryDto } from './dto/create-category.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const slug = require('limax');

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: { skip?: number; take?: number }) {
    const { skip, take } = params;

    return this.prisma.category.findMany({
      skip,
      take,
      select: {
        slug: true,
        name: true,
      },
    });
  }

  async findOne(slug: string) {
    const category = await this.prisma.category.findUnique({
      where: {
        slug,
      },
      select: {
        slug: true,
        name: true,
      },
    });

    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      return await this.prisma.category.create({
        data: {
          name: createCategoryDto.name,
          slug: slug(createCategoryDto.name),
        },
        select: {
          slug: true,
          name: true,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException([
            'Category with such name (or slug) already exists.',
          ]);
        }
      }

      throw e;
    }
  }

  async delete(slug: string) {
    try {
      return await this.prisma.category.delete({
        where: {
          slug,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new BadRequestException([
            'Category with such slug does not exist.',
          ]);
        }
      }

      throw e;
    }
  }
}
