import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { PatchPublisherDto } from './dto/patch-publisher.dto';
import { FindAllQuery } from 'src/common/query/find-all.query';
import { PutPublisherEditorDto } from './dto/put-editor.dto';

@Injectable()
export class PublishersService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: { skip?: number; take?: number }) {
    const { skip, take } = params;

    return this.prisma.publisher.findMany({
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
    const publisher = await this.prisma.publisher.findUnique({
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

    if (!publisher) {
      throw new NotFoundException();
    }

    return publisher;
  }

  async create(createPublisherDto: CreatePublisherDto) {
    try {
      return await this.prisma.publisher.create({
        data: {
          name: createPublisherDto.name,
          displayName: createPublisherDto.displayName,
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
          throw new BadRequestException(
            'Publisher with such name already exists.',
          );
        }
      }

      throw e;
    }
  }

  async patch(name: string, patchPublisherDto: PatchPublisherDto) {
    try {
      return await this.prisma.publisher.update({
        where: {
          name,
        },
        data: {
          displayName: patchPublisherDto.displayName,
          type: patchPublisherDto.type,
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
          throw new BadRequestException(
            'Publisher with such name does not exist.',
          );
        }
      }

      throw e;
    }
  }

  async delete(name: string) {
    try {
      return await this.prisma.publisher.delete({
        where: {
          name,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new BadRequestException(
            'Publisher with such name does not exist.',
          );
        }
      }

      throw e;
    }
  }

  async findAllEditors(name: string, { take, skip }: FindAllQuery) {
    try {
      const publisher = await this.prisma.publisher.findUnique({
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

      if (!publisher) {
        throw new NotFoundException();
      }

      return publisher.users;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new BadRequestException(
            'Publisher with such name does not exist.',
          );
        }
      }

      throw e;
    }
  }

  async checkUserMembership(name: string, username: string) {
    const publisher = await this.prisma.publisher.findFirst({
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

    if (!publisher) {
      throw new NotFoundException();
    }

    return publisher;
  }

  async putEditor(name: string, putEditorDtp: PutPublisherEditorDto) {
    try {
      await this.prisma.publisher.update({
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
          throw new BadRequestException(
            'User with such username does not exist.',
          );
        }
        if (e.code === 'P2016') {
          throw new BadRequestException(
            'Publisher with such name does not exist.',
          );
        }
      }

      throw e;
    }
  }

  async deleteEditor(name: string, username: string) {
    // TODO: throw if username didn't exist
    try {
      await this.prisma.publisher.update({
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
          throw new BadRequestException(
            'Publisher with such name does not exist.',
          );
        }
      }

      throw e;
    }
  }
}
