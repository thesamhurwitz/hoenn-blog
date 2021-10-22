import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateWriterDto } from './dto/create-writer.dto';
import { PatchWriterDto } from './dto/patch-writer.dto';
import { FindAllQuery } from 'src/common/query/find-all.query';
import { PutWriterEditorDto } from './dto/put-editor.dto';

@Injectable()
export class WritersService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: { skip?: number; take?: number }) {
    const { skip, take } = params;

    return this.prisma.writer.findMany({
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
    const writer = await this.prisma.writer.findUnique({
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

    if (!writer) {
      throw new NotFoundException();
    }

    return writer;
  }

  async create(createWriterDto: CreateWriterDto) {
    try {
      return await this.prisma.writer.create({
        data: {
          name: createWriterDto.name,
          displayName: createWriterDto.displayName,
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
            'Writer with such name already exists.',
          ]);
        }
      }

      throw e;
    }
  }

  async patch(name: string, patchWriterDto: PatchWriterDto) {
    try {
      return await this.prisma.writer.update({
        where: {
          name,
        },
        data: {
          displayName: patchWriterDto.displayName,
          type: patchWriterDto.type,
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
            'Writer with such name does not exist.',
          ]);
        }
      }

      throw e;
    }
  }

  async delete(name: string) {
    try {
      return await this.prisma.writer.delete({
        where: {
          name,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new BadRequestException([
            'Writer with such name does not exist.',
          ]);
        }
      }

      throw e;
    }
  }

  async findAllPosts(name: string, { take, skip }: FindAllQuery) {
    return this.prisma.post.findMany({
      where: {
        writer: {
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
      const writer = await this.prisma.writer.findUnique({
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

      if (!writer) {
        throw new NotFoundException();
      }

      return writer.users;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new BadRequestException([
            'Writer with such name does not exist.',
          ]);
        }
      }

      throw e;
    }
  }

  async checkUserMembership(name: string, username: string) {
    const writer = await this.prisma.writer.findFirst({
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

    if (!writer) {
      throw new NotFoundException();
    }

    return writer;
  }

  async putEditor(name: string, putEditorDtp: PutWriterEditorDto) {
    try {
      await this.prisma.writer.update({
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
            'Writer with such name does not exist.',
          ]);
        }
      }

      throw e;
    }
  }

  async deleteEditor(name: string, username: string) {
    // TODO: throw if username didn't exist
    try {
      await this.prisma.writer.update({
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
            'Writer with such name does not exist.',
          ]);
        }
      }

      throw e;
    }
  }
}
