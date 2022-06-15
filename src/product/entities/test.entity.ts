import { NodeType, NodeInterface } from 'nestjs-relay'
import {Field} from '@nestjs/graphql';

@NodeType()
export class Ship extends NodeInterface {
  @Field()
  name: string;
}
