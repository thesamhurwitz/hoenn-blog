import { User as UserModel } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { PatchUserDto } from './dto/patch-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll({ take, skip }: {
        take: any;
        skip: any;
    }): Promise<UserModel[]>;
    findOne(id: string): Promise<UserModel>;
    create(createUserDto: CreateUserDto): Promise<UserModel>;
    patch(patchUserDto: PatchUserDto): Promise<UserModel>;
    delete(deleteUserDto: DeleteUserDto): Promise<UserModel>;
}
