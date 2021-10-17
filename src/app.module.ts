import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PublishersModule } from './publisher/publishers.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    PostsModule,
    UsersModule,
    PublishersModule,
    CategoriesModule,
    AuthModule,
  ],
})
export class AppModule {}
