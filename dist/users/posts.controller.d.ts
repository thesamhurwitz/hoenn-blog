import { Post as PostModel } from '@prisma/client';
import { PostsService } from './posts.service';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAll({ take, skip }: {
        take: any;
        skip: any;
    }): Promise<PostModel[]>;
    findOne(id: number): Promise<PostModel>;
}
