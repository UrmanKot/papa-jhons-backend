import {ArgsType, Field, InputType} from '@nestjs/graphql';
import {IsNotEmpty} from 'class-validator';
import {ProductCategoryType} from '../enums/product-category.type';
import {ConnectionArgs, OrderByInput} from 'nestjs-graphql-relay';
import {ProductNodeWhereInput} from './product-where.input';

@InputType()
export class CreateProductInput {
  @Field()
  @IsNotEmpty()
  readonly name: string;

  @Field()
  @IsNotEmpty()
  readonly description: string;

  @Field()
  readonly category: ProductCategoryType;

  @Field()
  @IsNotEmpty()
  readonly price: number;

  @Field()
  readonly count: number;

  @Field()
  readonly isAddNutritionalValue: boolean;

  @Field({nullable: true})
  readonly proteins?: number;

  @Field({nullable: true})
  readonly greases?: number;

  @Field({nullable: true})
  readonly carbs?: number;

  @Field({nullable: true})
  readonly energyValue?: number;

  @Field({nullable: true})
  readonly weight?: number;
}

@ArgsType()
export class ProductNodeConnectionArgs extends ConnectionArgs {
  @Field(() => ProductNodeWhereInput, {nullable: true})
  readonly where?: ProductNodeWhereInput;

  @Field(() => OrderByInput, {nullable: true})
  readonly orderBy?: OrderByInput;
}
