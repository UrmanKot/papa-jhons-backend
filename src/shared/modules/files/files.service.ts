import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {FileUpload} from 'graphql-upload';
import {v4} from 'uuid';
import {path} from 'app-root-path';
import * as moment from 'moment';
import * as sharp from 'sharp';
import {ensureDir, writeFile} from 'fs-extra';
import {createWriteStream} from 'fs';

@Injectable()
export class FilesService {

  // TODO ДОДЕЛАТЬ ЧТОБЫ УДАЛЯЛ ФАЙЛЫ
  async saveFileAsWebp(file: FileUpload): Promise<string> {
    const {mimetype, encoding, createReadStream} = file;
    let {filename} = file;

    if (!mimetype.includes('image')) {
      throw new HttpException('The file is not an image', HttpStatus.BAD_REQUEST);
    }

    const filenameArr = filename.split('.');
    filename = filenameArr.splice(0, filenameArr.length - 1).join('.');

    const uniqueName = `${filename}.` + v4().split('-').splice(0, 3).join('') + moment().format('mmssSSS');
    const uploadFolder = `${path}/uploads/media/`;
    await ensureDir(uploadFolder);

    const fileUrl = `${process.env.SERVE_ROOT}/${uniqueName}.webp`;

    const imageBuffer: Buffer = await this.streamToString(createReadStream());
    const sharpImage = await this.convertToWebP(imageBuffer);
    await writeFile(`${uploadFolder}/${uniqueName}.webp`, sharpImage);

    return fileUrl;
  }

  async saveFile(file: FileUpload): Promise<boolean> {
    const {mimetype, encoding, createReadStream} = file;

    let {filename} = file;

    const filenameArr = filename.split('.');
    const fileType = filenameArr[filenameArr.length - 1];

    // вырезаем название файла без типа
    filename = filenameArr.splice(0, filenameArr.length - 1).join('.');

    const uniqueName = `${filename}.` + v4().split('-').splice(0, 3).join('') + moment().format('mmssSSS') + `.${fileType}`;
    const uploadFolder = `${path}/uploads/media/`;

    // если папки нет, создаем
    await ensureDir(uploadFolder);

    return new Promise((resolve, reject) =>
        createReadStream()
            .pipe(createWriteStream(`${uploadFolder}/${uniqueName}`))
            .on('finish', () => resolve(true))
            .on('error', (error) => reject(error)),
    );
  }

  streamToString(stream): Promise<Buffer> {
    const chunks = [];
    return new Promise((resolve, reject) => {
      stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      stream.on('error', (err) => reject(err));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
  }

  async convertToWebP(buffer: Buffer) {
    return await sharp(buffer).webp().toBuffer();
  }
}
