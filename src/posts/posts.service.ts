import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Post, Prisma } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll(params: { skip?: number; take?: number }): Promise<Post[]> {
    const { skip, take } = params;

    return this.prisma.post.findMany({
      skip,
      take,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    try {
      return await this.prisma.post.create({
        data: {
          content: createPostDto.content,
          title: createPostDto.title,
          author: {
            connect: {
              id: createPostDto.author,
            },
          },
        },
        include: {
          author: true,
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
