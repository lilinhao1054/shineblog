import { Controller, Get, Query } from '@nestjs/common';
import { Result } from 'src/common/Result';
import { TagService } from 'src/tag/tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll() {
    try {
      const res = await this.tagService.findAll();
      return Result.success(res);
    } catch (e) {
      return Result.fail('查询失败');
    }
  }

  @Get('/page')
  async searchPage(
    @Query('current') current: number,
    @Query('pageSize') pageSize: number,
    @Query('name') name: string,
    @Query('startTime') startTime: Date,
    @Query('endTime') endTime: Date,
  ) {
    try {
      const res = await this.tagService.searchPage(
        current,
        pageSize,
        name,
        startTime,
        endTime,
      );
      return Result.success(res);
    } catch (e) {
      return Result.fail('查询失败');
    }
  }
}
