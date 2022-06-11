import {Injectable, NestMiddleware} from '@nestjs/common';
import {NextFunction} from 'express';
import {ExpressRequestInterface} from '../../shared/types/express-request.interface';
import {AuthService} from '../auth.service';
import {TokenService} from '../services/token.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
      private readonly authService: AuthService,
      private readonly tokenService: TokenService,
  ) {
  }

  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      req.user = null;
      next();
      return;
    }

    const accessToken = authorizationHeader.split(' ')[1];
    const userDataDecode = this.tokenService.validateAccessToken(accessToken);

    if (!userDataDecode) {
      req.user = null;
      next();
      return;
    }

    delete userDataDecode.iat;
    delete userDataDecode.exp;

    req.user = userDataDecode;
    next();
  }
}
