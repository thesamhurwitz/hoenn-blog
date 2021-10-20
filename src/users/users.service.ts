import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { FindAllQuery } from 'src/common/query/find-all.query';

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
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
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

  // async create(createUserDto: CreateUserDto) {
  //   try {
  //     return await this.prisma.user.create({
  //       data: {
  //         username: createUserDto.username,
  //         email: createUserDto.email,
  //         profile: createUserDto.bio
  //           ? {
  //               create: {
  //                 bio: createUserDto.bio,
  //               },
  //             }
  //           : undefined,
  //       },
  //       select: {
  //         id: true,
  //         username: true,
  //         email: true,
  //         role: true,
  //         createdAt: true,
  //         updatedAt: true,
  //         profile: {
  //           select: {
  //             bio: true,
  //           },
  //         },
  //       },
  //     });
  //   } catch (e) {
  //     if (e instanceof Prisma.PrismaClientKnownRequestError) {
  //       if (e.code === 'P2002') {
  //         throw new BadRequestException(
  //           'User with such username or email already exists.',
  //         );
  //       }
  //     }

  //     throw e;
  //   }
  // }

  async patch(username: string, patchUserDto: PatchUserDto) {
    try {
      return await this.prisma.user.update({
        where: {
          username,
        },
        data: {
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
          role: patchUserDto.role,
        },
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
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
          throw new BadRequestException(
            'User with such username does not exist.',
          );
        }
        if (e.code === 'P2002') {
          throw new BadRequestException('User with such email already exists.');
        }
      }

      throw e;
    }
  }

  async delete(username: string) {
    try {
      return await this.prisma.user.delete({
        where: {
          username,
        },
        select: {
          hash: false,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new BadRequestException(
            'User with such username does not exist.',
          );
        }
      }

      throw e;
    }
  }

  async findAllUserWriters(username: string, { take, skip }: FindAllQuery) {
    try {
      return (
        await this.prisma.user.findUnique({
          where: {
            username,
          },
          select: {
            writers: {
              select: {
                id: true,
                name: true,
                type: true,
                displayName: true,
                createdAt: true,
                updatedAt: true,
              },
              skip,
              take,
            },
          },
        })
      ).writers;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new BadRequestException(
            'User with such username does not exist.',
          );
        }
      }

      throw e;
    }
  }

  async checkUserMembership(username: string, writerName: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
        writers: {
          some: {
            name: writerName,
          },
        },
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}
