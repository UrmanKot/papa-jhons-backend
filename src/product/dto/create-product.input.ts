import {Field, InputType} from '@nestjs/graphql';
import {IsEmail, IsNotEmpty, IsString} from 'class-validator';
import {ProductCategoryType} from '../enums/product-category.type';

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

  @Field({nullable: true})
  readonly count?: number;

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
