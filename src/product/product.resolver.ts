import {Args, Mutation, Query, Resolver, Subscription} from '@nestjs/graphql';
import {Inject, UsePipes, ValidationPipe} from '@nestjs/common';
import {ProductNode, ProductNodeConnection} from './entities/product.entity';
import {CreateProductInput, ProductNodeConnectionArgs} from './dto/create-product.input';
import {ProductService} from './product.service';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import {FileUpload} from 'graphql-upload';
import {RedisPubSub} from 'graphql-redis-subscriptions';
import {PUB_SUB} from '../shared/modules/pubsub/pubSubModule';

@Resolver()
export class ProductResolver {
  constructor(
      @Inject(PUB_SUB) private readonly pubSub: RedisPubSub,
      private readonly productService: ProductService,
  ) {
  }

  @Query(() => ProductNode)
  @UsePipes(new ValidationPipe())
  async product(
      @Args('id') id: string,
  ): Promise<ProductNode> {
    return await this.productService.getProduct(id);
  }

  @Query(() => [ProductNode])
  @UsePipes(new ValidationPipe())
  async products(): Promise<ProductNode[]> {
    return await this.productService.getProducts();
  }

  @Query(() => ProductNodeConnection)
  products2(@Args() { where, orderBy, ...args }: ProductNodeConnectionArgs,
  ): Promise<any> {
    return this.productService.find(where, orderBy, args);
  }

  @Mutation(() => ProductNode)
  @UsePipes(new ValidationPipe())
  async productCreate(
      @Args('createProductInput') createProductInput: CreateProductInput,
      @Args({name: 'file', type: () => GraphQLUpload, nullable: true}) file: FileUpload
  ): Promise<ProductNode> {
    const newProduct = await this.productService.createProduct(createProductInput, file);
    this.pubSub.publish('productAdded', {productAdded: newProduct});
    return newProduct;
  }

  @Mutation(() => Boolean)
  @UsePipes(new ValidationPipe())
  async productRemove(@Args('id') id: string): Promise<Boolean> {
    const deleteResult = await this.productService.removeProduct(id);
    return Boolean(deleteResult);
  }

  @Subscription(() => ProductNode)
  productAdded() {
    return this.pubSub.asyncIterator('productAdded');
  }
}
