import { Inject, Injectable } from '@nestjs/common';
import { Setting } from './entities/setting.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from 'minio';
import { nanoid } from 'nanoid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SettingService {
  constructor(
    @InjectRepository(Setting)
    private settingRepository: Repository<Setting>,
    @Inject('MINIO') private readonly minioClient: Client,
    private configService: ConfigService,
  ) {}

  async find() {
    const res = await this.settingRepository.find();
    return res[0];
  }

  async save(file: Express.Multer.File, setting: Setting) {
    if (file) {
      const uuid = nanoid();
      await this.minioClient.putObject(
        this.configService.get<string>('MINIO_BUCKET'),
        uuid,
        file.buffer,
        {
          fileName: file.originalname,
        },
      );
      setting.authorAvatar = uuid;
    }

    return this.settingRepository.save(setting);
  }
}
