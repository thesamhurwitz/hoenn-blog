import { PostsModule } from './posts/posts.module';
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PublishersModule } from './publisher/publishers.module';

@Module({
  imports: [PostsModule, UsersModule, PublishersModule],
})
export class AppModule {}
