import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: { skip?: number; take?: number }): Promise<User[]> {
    const { skip, take } = params;

    return this.prisma.user.findMany({
      skip,
      take,
      include: {
        profile: true,
      },
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
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
    });
  }

  async patch(patchUserDto: PatchUserDto): Promise<User> {
    return this.prisma.user.update({
      where: {
        username: patchUserDto.username,
      },
      data: {
        ...patchUserDto,
      },
    });
  }

  async delete(deleteUserDto: DeleteUserDto): Promise<User> {
    return this.prisma.user.delete({
      where: {
        username:
          'username' in deleteUserDto ? deleteUserDto.username : undefined,
        id: 'id' in deleteUserDto ? deleteUserDto.id : undefined,
      },
    });
  }
}
