import { Global, Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';

const MINIO: Provider = {
  inject: [ConfigService],
  provide: 'MINIO',
  useFactory: (configService: ConfigService) =>
    new Minio.Client({
      endPoint: configService.get('MINIO_ENDPOINT'),
      port: +configService.get('MINIO_PORT'),
      useSSL: false,
      accessKey: configService.get('MINIO_ACCESSKEY'),
      secretKey: configService.get('MINIO_SECRETKEY'),
    }),
};

@Global()
@Module({
  providers: [MINIO],
  exports: [MINIO],
})
export class MinioClientModule {}
