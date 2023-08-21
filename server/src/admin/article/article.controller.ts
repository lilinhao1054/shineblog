import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { Result } from 'src/common/Result';
import { FileInterceptor } from '@nestjs/platform-express';
import { ArticleService } from 'src/article/article.service';
import { SaveArticleDto } from 'src/article/dto/save-article.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('admin/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @UseInterceptors(FileInterceptor('cover'))
  async save(
    @UploadedFile() cover: Express.Multer.File,
    @Body() saveArticleDto: SaveArticleDto,
  ) {
    try {
      const res = await this.articleService.save(cover, saveArticleDto);
      return Result.success(res);
    } catch (e) {
      return Result.fail('发布失败');
    }
  }

  @Get()
  async findAll() {
    try {
      const res = await this.articleService.findAll();
      return Result.success(res);
    } catch (e) {
      return Result.fail('查询失败');
    }
  }

  @Get('/page')
  async searchPage(
    @Query('current') current: number,
    @Query('pageSize') pageSize: number,
    @Query('title') title: string,
    @Query('startTime') startTime: Date,
    @Query('endTime') endTime: Date,
  ) {
    try {
      const res = await this.articleService.searchPageAdmin(
        current,
        pageSize,
        title,
        startTime,
        endTime,
      );
      return Result.success(res);
    } catch (e) {
      return Result.fail('查询失败');
    }
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    try {
      const res = await this.articleService.findOne(id);
      return Result.success(res);
    } catch (e) {
      return Result.fail(e.message);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const res = await this.articleService.remove(id);
      return Result.success(res);
    } catch (e) {
      return Result.fail('删除失败');
    }
  }
}
