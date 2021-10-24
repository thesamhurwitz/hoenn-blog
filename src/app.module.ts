import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [
    PostsModule,
    UsersModule,
    BlogsModule,
    CategoriesModule,
    AuthModule,
  ],
})
export class AppModule {}
