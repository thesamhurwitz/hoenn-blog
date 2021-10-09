interface DeleteUserByUsername {
    readonly username: string;
}
interface DeleteUserById {
    readonly id: number;
}
export declare type DeleteUserDto = DeleteUserById | DeleteUserByUsername;
export {};
