import { Controller, Get, Query } from '@nestjs/common';
import { Result } from 'src/common/Result';
import { CategoryService } from 'src/category/category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll() {
    try {
      const res = await this.categoryService.findAll();
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
      const res = await this.categoryService.searchPage(
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
