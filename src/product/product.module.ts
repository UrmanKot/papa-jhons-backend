import {Module} from '@nestjs/common';
import {ProductService} from './product.service';
import {ProductResolver} from './product.resolver';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ProductNode} from './entities/product.entity';
import {FilesService} from '../shared/modules/files/files.service';
import {GlobalIdScalar} from 'nestjs-relay';
import {Ship} from './entities/test.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductNode]),
    // TypeOrmModule.forFeature([Ship]),
  ],
  providers: [ProductService, ProductResolver, FilesService, GlobalIdScalar]
})
export class ProductModule {}
