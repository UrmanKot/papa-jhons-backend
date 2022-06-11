import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {GqlExecutionContext} from '@nestjs/graphql';

export const EncUser = createParamDecorator((data: any, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  const request = ctx.getContext().req;

  if (!request) {
    return null;
  }

  if (data) {
    return request.user[data];
  }

  return request.user;
});
