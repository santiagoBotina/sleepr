import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UsersDocument } from '@app/common';

function getContextByUser(context: ExecutionContext): UsersDocument {
  return context.switchToHttp().getRequest().user;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => getContextByUser(context),
);
