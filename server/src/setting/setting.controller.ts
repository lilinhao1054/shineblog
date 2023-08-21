import {
  Controller,
  Get,
  Body,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { SettingService } from './setting.service';
import { Setting } from './entities/setting.entity';
import { Result } from 'src/common/Result';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('admin/setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get()
  async getSetting() {
    try {
      const res = await this.settingService.find();
      return Result.success(res);
    } catch (e) {
      return Result.fail('获取设置失败');
    }
  }

  @Patch()
  @UseInterceptors(FileInterceptor('authorAvatar'))
  async save(
    @UploadedFile() authorAvatar: Express.Multer.File,
    @Body() setting: Setting,
  ) {
    try {
      const res = await this.settingService.save(authorAvatar, setting);
      return Result.success(res);
    } catch (e) {
      return Result.fail('保存失败');
    }
  }
}
