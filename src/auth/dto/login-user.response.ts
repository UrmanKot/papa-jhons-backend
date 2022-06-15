import { Field, ObjectType } from '@nestjs/graphql';
import {UserNode} from '../../user/entities/user.entity';
import {Tokens} from '../types/token.interface';

@ObjectType()
export class LoginUserResponse {
  @Field(() => Tokens)
  tokens: Tokens;

  @Field(() => UserNode)
  user: UserNode;
}
