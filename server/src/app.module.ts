import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebModule } from './web/web.module';
import { AdminModule } from './admin/admin.module';
import { MinioClientModule } from './minio-client/minio-client.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { MYSQL_CONFIG } from './config/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: MYSQL_CONFIG.HOST,
      port: MYSQL_CONFIG.PORT,
      username: MYSQL_CONFIG.USERNAME,
      password: MYSQL_CONFIG.PASSWORD,
      database: MYSQL_CONFIG.DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    WebModule,
    AdminModule,
    MinioClientModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
