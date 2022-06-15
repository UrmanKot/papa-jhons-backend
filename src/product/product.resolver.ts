import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {UsePipes, ValidationPipe} from '@nestjs/common';
import {ProductNode} from './entities/product.entity';
import {CreateProductInput} from './dto/create-product.input';
import {ProductService} from './product.service';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import {FileUpload} from 'graphql-upload';

@Resolver()
export class ProductResolver {
  constructor(
      private readonly productService: ProductService,
  ) {
  }

  @Mutation(() => ProductNode)
  @UsePipes(new ValidationPipe())
  async createProduct(
      @Args('createProductInput') createProductInput: CreateProductInput,
      @Args({name: 'file', type: () => GraphQLUpload, nullable: true}) file: FileUpload
  ): Promise<ProductNode> {
    return await this.productService.createProduct(createProductInput, file);
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
}
