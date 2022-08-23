import {Module} from '@nestjs/common';
import {ProductService} from './product.service';
import {ProductResolver} from './product.resolver';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductNode} from './entities/product.entity';
import {FilesService} from '../shared/modules/files/files.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductNode]),
  ],
  providers: [ProductService, ProductResolver, FilesService]
})
export class ProductModule {}
