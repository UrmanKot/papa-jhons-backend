import {Request} from 'express';
import {EncryptedUserInterface} from '../../auth/types/encrypted-user.interface';

export interface ExpressRequestInterface extends Request {
   user?: EncryptedUserInterface
}
