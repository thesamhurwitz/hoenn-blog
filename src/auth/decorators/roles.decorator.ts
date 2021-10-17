import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from 'prisma/prisma-client';
import { RolesGuard } from '../guards/roles.guard';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) =>
  applyDecorators(UseGuards(RolesGuard), SetMetadata(ROLES_KEY, roles));
