import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserNode} from '../user/entities/user.entity';
import {MailService} from '../shared/services/mail.service';
import { AuthController } from './auth.controller';
import {TokenService} from './services/token.service';
import {AuthGuard} from './guards/auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserNode]),
  ],
  exports: [AuthService, TokenService],
  providers: [AuthResolver, AuthService, MailService, TokenService, AuthGuard],
  controllers: [AuthController]
})
export class AuthModule {}
