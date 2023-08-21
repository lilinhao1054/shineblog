import { Module } from '@nestjs/common';
import { SettingController } from './setting.controller';
import { SettingModule } from 'src/setting/setting.module';

@Module({
  imports: [SettingModule],
  controllers: [SettingController],
})
export class AdminSettingModule {}
