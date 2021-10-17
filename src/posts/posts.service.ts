import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Post, Prisma } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
import { PatchPostDto } from './dto/patch-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: { skip?: number; take?: number }, category: string) {
    const { skip, take } = params;

    return this.prisma.post.findMany({
      where: category
        ? {
            categories: {
              some: {
                slug: category,
              },
            },
          }
        : undefined,
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        published: true,
        publisher: {
          select: {
            id: true,
            name: true,
            displayName: true,
            type: true,
          },
        },
        categories: {
          select: {
            slug: true,
            name: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        published: true,
        content: true,
        publisher: {
          select: {
            id: true,
            name: true,
            displayName: true,
            type: true,
          },
        },
        categories: {
          select: {
            slug: true,
            name: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async create(createPostDto: CreatePostDto) {
    try {
      return await this.prisma.post.create({
        data: {
          content: createPostDto.content,
          title: createPostDto.title,
          publisher: {
            connect: {
              name: createPostDto.publisher,
            },
          },
          categories: createPostDto.categories
            ? {
                connect: createPostDto.categories.map((c) => {
                  return { slug: c };
                }),
              }
            : undefined,
        },
        select: {
          id: true,
          title: true,
          published: true,
          createdAt: true,
          updatedAt: true,
          publisher: {
            select: {
              id: true,
              name: true,
              displayName: true,
              type: true,
            },
          },
          categories: {
            select: {
              slug: true,
              name: true,
            },
          },
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new BadRequestException(
            'Publisher with such id does not exist.',
          );
        }
      }

      throw e;
    }
  }

  async patch(id: number, patchPostDto: PatchPostDto) {
    try {
      return await this.prisma.post.update({
        where: {
          id,
        },
        data: {
          title: patchPostDto.title,
          content: patchPostDto.content,
          published: patchPostDto.published,
          publisher: patchPostDto.publisher
            ? {
                connect: {
                  name: patchPostDto.publisher,
                },
              }
            : undefined,
          categories: patchPostDto.categories
            ? {
                connect: patchPostDto.categories.map((c) => {
                  return { slug: c };
                }),
              }
            : undefined,
        },
        select: {
          id: true,
          title: true,
          published: true,
          createdAt: true,
          updatedAt: true,
          publisher: {
            select: {
              id: true,
              name: true,
              displayName: true,
              type: true,
            },
          },
          categories: {
            select: {
              slug: true,
              name: true,
            },
          },
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new BadRequestException(
            'Publisher with such id does not exist.',
          );
        }
      }

      throw e;
    }
  }

  async delete(id: number) {
    try {
      return await this.prisma.post.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new BadRequestException('Post with such id does not exist.');
        }
      }

      throw e;
    }
  }
}
