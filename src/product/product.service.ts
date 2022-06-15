import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateProductInput} from './dto/create-product.input';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ProductNode} from './entities/product.entity';
import {FileUpload} from 'graphql-upload';
import {FilesService} from '../shared/modules/files/files.service';

@Injectable()
export class ProductService {
  constructor(
      @InjectRepository(ProductNode) private readonly productRepository: Repository<ProductNode>,
      private readonly filesService: FilesService,
  ) {
  }

  async createProduct(createProductInput: CreateProductInput, file: FileUpload): Promise<ProductNode> {
    const newProduct = new ProductNode();

    if (file) {
      newProduct.image = await this.filesService.saveFileAsWebp(file);
    }

    Object.assign(newProduct, createProductInput);
    return await this.productRepository.save(newProduct);
  }

  async getProduct(id: string): Promise<ProductNode> {
    const product = await this.productRepository.findOne({id});

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return product;
  }

  async getProducts(): Promise<ProductNode[]> {
    return await this.productRepository.find();
  }
}
