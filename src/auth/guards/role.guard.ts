import {CanActivate, ExecutionContext, HttpException, HttpStatus, mixin, Type} from '@nestjs/common';
import {Observable} from 'rxjs';
import {GqlExecutionContext} from '@nestjs/graphql';
import {RoleType} from '../enums/role.type';

export const RoleGuard = (role: RoleType): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      const ctx = GqlExecutionContext.create(context);
      const request = ctx.getContext().req;

      if (!request.user) {
        throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
      }

      if (request.user.role === role) {
        return true;
      }

      throw new HttpException('Не достаточно прав!', HttpStatus.FORBIDDEN)
    }
  }

  return mixin(RoleGuardMixin);
};
