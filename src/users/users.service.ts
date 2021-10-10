import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: { skip?: number; take?: number }) {
    const { skip, take } = params;

    return this.prisma.user.findMany({
      skip,
      take,
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        profile: {
          select: {
            bio: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prisma.user.create({
        data: {
          username: createUserDto.username,
          email: createUserDto.email,
          profile: createUserDto.bio
            ? {
                create: {
                  bio: createUserDto.bio,
                },
              }
            : undefined,
        },
        select: {
          id: true,
          username: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          profile: {
            select: {
              bio: true,
            },
          },
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException(
            'User with such username or email already exists.',
          );
        }
      }

      throw e;
    }
  }

  async patch(id: number, patchUserDto: PatchUserDto) {
    try {
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          username: patchUserDto.username,
          email: patchUserDto.email,
          profile: {
            upsert: {
              create: {
                bio: patchUserDto.bio,
              },
              update: {
                bio: patchUserDto.bio,
              },
            },
          },
        },
        select: {
          id: true,
          username: true,
          email: true,
          createdAt: true,
          updatedAt: true,
          profile: {
            select: {
              bio: true,
            },
          },
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new BadRequestException('User with such id does not exist.');
        }
      }

      throw e;
    }
  }

  async delete(id: number) {
    try {
      return await this.prisma.user.delete({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new BadRequestException('User with such id does not exist.');
        }
      }

      throw e;
    }
  }
}
