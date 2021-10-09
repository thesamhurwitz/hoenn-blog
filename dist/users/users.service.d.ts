import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(params: {
        skip?: number;
        take?: number;
    }): Promise<User[]>;
    findOne(id: number): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<User>;
    patch(patchUserDto: PatchUserDto): Promise<User>;
    delete(deleteUserDto: DeleteUserDto): Promise<User>;
}
