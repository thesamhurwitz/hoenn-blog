import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { PublishersController } from './publishers.controller';
import { PublishersService } from './publishers.service';

@Module({
  controllers: [PublishersController],
  providers: [PublishersService, PrismaService],
})
export class PublishersModule {}
