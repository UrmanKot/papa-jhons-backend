import {Field, InputType} from '@nestjs/graphql';
import {IsNotEmpty, IsString} from 'class-validator';

@InputType()
export class ActivateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  activationLink: string;
}
