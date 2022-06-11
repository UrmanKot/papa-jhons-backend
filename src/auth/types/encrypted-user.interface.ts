import {RoleEnum} from '../enums/role.enum';

export interface EncryptedUserInterface {
  idNumber: number;
  id: string;
  email: string;
  role: RoleEnum;
  iat?: number;
  exp?: number;
}
