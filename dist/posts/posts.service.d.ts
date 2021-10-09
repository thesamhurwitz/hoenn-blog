import { PrismaService } from 'src/prisma.service';
import { Post } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(params: {
        skip?: number;
        take?: number;
    }): Promise<Post[]>;
    findOne(id: number): Promise<Post>;
    create(createPostDto: CreatePostDto): Promise<Post>;
}
