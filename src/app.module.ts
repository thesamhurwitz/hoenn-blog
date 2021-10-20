import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { WritersModule } from './writers/writers.module';

@Module({
  imports: [
    PostsModule,
    UsersModule,
    WritersModule,
    CategoriesModule,
    AuthModule,
  ],
})
export class AppModule {}
