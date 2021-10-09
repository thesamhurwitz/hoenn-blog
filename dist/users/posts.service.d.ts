import { PrismaService } from 'src/prisma.service';
import { Post } from '@prisma/client';
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(params: {
        skip?: number;
        take?: number;
    }): Promise<Post[]>;
    findOne(id: number): Promise<Post>;
}
