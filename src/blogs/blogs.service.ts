import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateBlogDto } from './dto/create-blog.dto';
import { PatchBlogDto } from './dto/patch-blog.dto';
import { FindAllQuery } from 'src/common/query/find-all.query';
import { PutBlogEditorDto } from './dto/put-blog.dto';

@Injectable()
export class BlogsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: { skip?: number; take?: number }) {
    const { skip, take } = params;

    return this.prisma.blog.findMany({
      skip,
      take,
      select: {
        id: true,
        name: true,
        displayName: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(name: string) {
    const blog = await this.prisma.blog.findUnique({
      where: {
        name,
      },
      select: {
        id: true,
        name: true,
        displayName: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!blog) {
      throw new NotFoundException();
    }

    return blog;
  }

  async create(createBlogDto: CreateBlogDto) {
    try {
      return await this.prisma.blog.create({
        data: {
          name: createBlogDto.name,
          displayName: createBlogDto.displayName,
        },
        select: {
          id: true,
          name: true,
          displayName: true,
          type: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException([
            'Blog with such name already exists.',
          ]);
        }
      }

      throw e;
    }
  }

  async patch(name: string, patchBlogDto: PatchBlogDto) {
    try {
      return await this.prisma.blog.update({
        where: {
          name,
        },
        data: {
          displayName: patchBlogDto.displayName,
          type: patchBlogDto.type,
        },
        select: {
          id: true,
          name: true,
          displayName: true,
          type: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new BadRequestException([
            'Blog with such name does not exist.',
          ]);
        }
      }

      throw e;
    }
  }

  async delete(name: string) {
    try {
      return await this.prisma.blog.delete({
        where: {
          name,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new BadRequestException([
            'Blog with such name does not exist.',
          ]);
        }
      }

      throw e;
    }
  }

  async findAllPosts(name: string, { take, skip }: FindAllQuery) {
    return this.prisma.post.findMany({
      where: {
        blog: {
          name,
        },
      },
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
      },
    });
  }

  async findAllEditors(name: string, { take, skip }: FindAllQuery) {
    try {
      const blog = await this.prisma.blog.findUnique({
        where: {
          name,
        },
        select: {
          users: {
            select: {
              id: true,
              username: true,
              email: true,
              role: true,
              createdAt: true,
              updatedAt: true,
            },
            skip,
            take,
          },
        },
      });

      if (!blog) {
        throw new NotFoundException();
      }

      return blog.users;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new BadRequestException([
            'Blog with such name does not exist.',
          ]);
        }
      }

      throw e;
    }
  }

  async checkUserMembership(name: string, username: string) {
    const blog = await this.prisma.blog.findFirst({
      where: {
        name,
        users: {
          some: {
            username,
          },
        },
      },
      select: {
        id: true,
        name: true,
        displayName: true,
        type: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!blog) {
      throw new NotFoundException();
    }

    return blog;
  }

  async putEditor(name: string, putEditorDtp: PutBlogEditorDto) {
    try {
      await this.prisma.blog.update({
        where: {
          name,
        },
        data: {
          users: {
            connect: {
              username: putEditorDtp.username,
            },
          },
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new BadRequestException([
            'User with such username does not exist.',
          ]);
        }
        if (e.code === 'P2016') {
          throw new BadRequestException([
            'Blog with such name does not exist.',
          ]);
        }
      }

      throw e;
    }
  }

  async deleteEditor(name: string, username: string) {
    // TODO: throw if username didn't exist
    try {
      await this.prisma.blog.update({
        where: {
          name,
        },
        data: {
          users: {
            disconnect: {
              username,
            },
          },
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new BadRequestException([
            'Blog with such name does not exist.',
          ]);
        }
      }

      throw e;
    }
  }
}
