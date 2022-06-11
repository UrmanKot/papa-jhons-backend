import {registerEnumType} from '@nestjs/graphql';

export enum RoleEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

registerEnumType(RoleEnum, { name: 'RoleEnum' })
