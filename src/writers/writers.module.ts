import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { WritersController } from './writers.controller';
import { WritersService } from './writers.service';

@Module({
  controllers: [WritersController],
  providers: [WritersService, PrismaService],
})
export class WritersModule {}
