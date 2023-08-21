import { Controller, Get, Param, Query } from '@nestjs/common';
import { ArticleService } from 'src/article/article.service';
import { Result } from 'src/common/Result';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

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
    @Query('categoryId') categoryId: number,
    @Query('tagId') tagId: number,
  ) {
    try {
      const res = await this.articleService.searchPageWeb(
        current,
        pageSize,
        categoryId,
        tagId,
      );
      return Result.success(res);
    } catch (e) {
      return Result.fail('查询失败');
    }
  }

  @Get(':id')
  async getArticleDetail(@Param('id') id: number) {
    try {
      await this.articleService.incPageView(id);
      const res = await this.articleService.findOne(id);
      return Result.success(res);
    } catch (e) {
      return Result.fail(e.message);
    }
  }

  @Get('/adjacent/:id')
  async getAdjacentArticle(@Param('id') id: number) {
    try {
      const res = await this.articleService.getAdjacentArticleById(id);
      return Result.success(res);
    } catch (e) {
      return Result.fail(e.message);
    }
  }
}
