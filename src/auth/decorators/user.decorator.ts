import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthPayload } from '../auth-payload';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as AuthPayload;
  },
);
