import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindAllQuery } from 'src/common/query/find-all.query';
import { CreateUserDto } from './dto/create-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // User

  @Get()
  async findAll(@Query() { take, skip }: FindAllQuery) {
    return this.usersService.findAll({ take, skip });
  }

  @Get(':username')
  async findOne(@Param('username') username: string) {
    return this.usersService.findOne(username);
  }

  // @Post()
  // async create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @Patch(':username')
  async patch(
    @Param('username') username: string,
    @Body() patchUserDto: PatchUserDto,
  ) {
    return this.usersService.patch(username, patchUserDto);
  }

  @Delete(':username')
  async delete(@Param('username') username: string) {
    return this.usersService.delete(username);
  }

  // User's publishers

  @Get(':username/publishers')
  async findAllPublishers(
    @Param('username') username: string,
    @Query() { take, skip }: FindAllQuery,
  ) {
    return this.usersService.findAllUserPublishers(username, { take, skip });
  }

  @Get(':username/publishers/:name')
  async findOnePublisher(
    @Param('username') username: string,
    @Param('name') name: string,
  ) {
    return this.usersService.checkUserMembership(username, name);
  }
}
