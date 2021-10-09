import { PostsModule } from './posts/posts.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PostsModule, UsersModule],
})
export class AppModule {}
