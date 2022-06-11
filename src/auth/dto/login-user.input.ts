import {IsEmail, IsNotEmpty, IsString} from 'class-validator';
import {Field, InputType} from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  password: string;
}
