import { Post as PostModel } from '@prisma/client';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAll({ take, skip }: {
        take: any;
        skip: any;
    }): Promise<PostModel[]>;
    findOne(id: string): Promise<PostModel>;
    create(createPostDto: CreatePostDto): Promise<PostModel>;
}
