import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Result } from 'src/common/Result';
import { Tag } from 'src/tag/entities/tag.entity';
import { TagService } from 'src/tag/tag.service';

@UseGuards(AuthGuard('jwt'))
@Controller('admin/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async createBatch(@Body() tags: Tag[]) {
    try {
      const res = await this.tagService.createBatch(tags);
      return Result.success(res);
    } catch (e) {
      return Result.fail('添加失败');
    }
  }

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

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const res = await this.tagService.remove(id);
      return Result.success(res);
    } catch (e) {
      return Result.fail('删除失败');
    }
  }
}
