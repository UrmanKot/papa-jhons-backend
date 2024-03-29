import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {AppService} from './app.service';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {GraphQLModule} from '@nestjs/graphql';
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import {TypeOrmModule, TypeOrmModuleAsyncOptions} from '@nestjs/typeorm';
import {AuthModule} from './auth/auth.module';
import {UserModule} from './user/user.module';
import {AuthMiddleware} from './auth/middlewares/auth.middleware';
import {GraphQLError, GraphQLFormattedError} from 'graphql';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import {FilesModule} from './shared/modules/files/files.module';
import { ProductModule } from './product/product.module';
import { PubSubModule } from './shared/modules/pubsub/pubSubModule';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath: './.env'}),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      buildSchemaOptions: {numberScalarMode: 'integer'},
      subscriptions: {'subscriptions-transport-ws': true,},
      path: '/graphql',
      sortSchema: true,
      playground: true,
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          // @ts-ignore
          message: error.extensions?.exception?.response?.message || error.message,
        };
        return graphQLFormattedError;
      }
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'aurora-data-api'>('TYPEORM_CONNECTION'),
        host: config.get<string>('TYPEORM_HOST'),
        port: config.get<number>('TYPEORM_PORT'),
        database: config.get<string>('TYPEORM_DATABASE'),
        username: config.get<string>('TYPEORM_USERNAME'),
        password: config.get<string>('TYPEORM_PASSWORD'),
        entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
        synchronize: false,
        autoLoadEntities: true,
        logging: true,
      } as TypeOrmModuleAsyncOptions),
    }),
    PubSubModule,
    AuthModule,
    UserModule,
    FilesModule,
    ProductModule,
  ],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes({path: '*', method: RequestMethod.ALL});
    consumer.apply(graphqlUploadExpress()).forRoutes('graphql');
  }
}
