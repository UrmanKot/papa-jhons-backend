import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {User} from '../user/entities/user.entity';
import {SetMetadata, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthService} from './auth.service';
import {CreateUserInput} from '../user/dto/create-user.input';
import {LoginUserResponse} from './dto/login-user.response';
import {LoginUserInput} from './dto/login-user.input';
import {EncUser} from './decorators/user.decorator';
import {AuthGuard} from './guards/auth.guard';

@Resolver()
export class AuthResolver {
  constructor(
      private readonly authService: AuthService,
  ) {
  }

  @Query(() => User)
  @UseGuards(AuthGuard)
  async getCurrentUser(@EncUser('idNumber') currentUserId: number) {
    return await this.authService.getCurrentUser(currentUserId)
  }

  @Mutation(() => LoginUserResponse)
  @UsePipes(new ValidationPipe())
  async login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    const user = await this.authService.login(loginUserInput);
    return this.authService.buildUserResponseForLogin(user);
  }

  @Mutation(() => User)
  @UsePipes(new ValidationPipe())
  async register(@Args('createUserInput') createUserInput: CreateUserInput): Promise<User> {
    const user = await this.authService.register(createUserInput);
    return user;
  }
}
