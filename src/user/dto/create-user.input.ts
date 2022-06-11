import {IsEmail, IsNotEmpty, IsString} from 'class-validator';
import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  readonly email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
