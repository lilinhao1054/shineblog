import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Result } from 'src/common/Result';
import { CategoryService } from 'src/category/category.service';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
import { UpdateCategoryDto } from 'src/category/dto/update-category.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('admin/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const res = await this.categoryService.create(createCategoryDto);
      return Result.success(res);
    } catch (e) {
      return Result.fail('新增失败');
    }
  }

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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      const res = await this.categoryService.update(+id, updateCategoryDto);
      return Result.success(res);
    } catch (e) {
      return Result.fail(e.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const res = await this.categoryService.remove(+id);
      return Result.success(res);
    } catch (e) {
      return Result.fail('删除失败');
    }
  }
}
