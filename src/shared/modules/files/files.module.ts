import {Module} from '@nestjs/common';
import {FilesService} from './files.service';
import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'path';
import {path} from 'app-root-path';
import {ConfigModule} from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: false}),
    ServeStaticModule.forRoot({
      rootPath: join(`${path}/uploads/media`),
      serveRoot: process.env.SERVE_ROOT
    }),
  ],
  providers: [FilesService]
})
export class FilesModule {
}
