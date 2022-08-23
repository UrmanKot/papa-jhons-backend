import {InputType, PartialType, PickType} from '@nestjs/graphql';
import {ProductNode} from '../entities/product.entity';

@InputType()
export class ProductNodeWhereInput extends PartialType(
    PickType(ProductNode, ['name'], InputType),
) {
}
