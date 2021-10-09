import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Query() { take, skip }): Promise<UserModel[]> {
    return this.usersService.findAll({ take, skip });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserModel> {
    return this.usersService.findOne(parseInt(id));
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    return this.usersService.create(createUserDto);
  }

  @Patch()
  async patch(@Body() patchUserDto: PatchUserDto): Promise<UserModel> {
    return this.usersService.patch(patchUserDto);
  }

  @Delete()
  async delete(@Body() deleteUserDto: DeleteUserDto): Promise<UserModel> {
    return this.usersService.delete(deleteUserDto);
  }
}
