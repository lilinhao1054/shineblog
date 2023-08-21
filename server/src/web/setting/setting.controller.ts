import { Controller, Get } from '@nestjs/common';
import { Result } from 'src/common/Result';
import { SettingService } from 'src/setting/setting.service';

@Controller('setting')
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
}
