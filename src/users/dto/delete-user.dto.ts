interface DeleteUserByUsername {
  readonly username: string;
}

interface DeleteUserById {
  readonly id: number;
}

export type DeleteUserDto = DeleteUserById | DeleteUserByUsername;
