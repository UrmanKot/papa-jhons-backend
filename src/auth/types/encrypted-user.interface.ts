import {RoleType} from '../enums/role.type';

export interface EncryptedUserInterface {
  idNumber: number;
  id: string;
  email: string;
  role: RoleType;
  iat?: number;
  exp?: number;
}
