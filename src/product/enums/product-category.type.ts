import {registerEnumType} from '@nestjs/graphql';

export enum ProductCategoryType {
  PIZZA = 'PIZZA',
  SNACKS = 'SNACKS',
  DRINKS = 'DRINKS',
  SAUCES = 'SAUCES',
  DESSERT = 'DESSERT',
  HOT = 'HOT',
  COMBOBOX = 'COMBOBOX',
  VEGAN = 'VEGAN',
}

registerEnumType(ProductCategoryType, { name: 'ProductCategoryType' })
