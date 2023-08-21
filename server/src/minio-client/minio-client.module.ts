import { Global, Module } from '@nestjs/common';
import { MINIO_CONFIG } from 'src/config/config';
import * as Minio from 'minio';

const MINIO = {
  provide: 'MINIO',
  useValue: new Minio.Client({
    endPoint: MINIO_CONFIG.MINIO_ENDPOINT,
    port: MINIO_CONFIG.MINIO_PORT,
    useSSL: false,
    accessKey: MINIO_CONFIG.MINIO_ACCESSKEY,
    secretKey: MINIO_CONFIG.MINIO_SECRETKEY,
  }),
};

@Global()
@Module({
  providers: [MINIO],
  exports: [MINIO],
})
export class MinioClientModule {}
