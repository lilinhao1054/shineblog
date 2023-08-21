import { Controller, Get, Query } from '@nestjs/common';
import { ArticleService } from 'src/article/article.service';
import { Result } from 'src/common/Result';

@Controller('archive')
export class ArchiveController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async getArciveData(
    @Query('current') current: number,
    @Query('pageSize') pageSize: number,
  ) {
    try {
      const res = await this.articleService.getArchiveData(current, pageSize);
      return Result.success(res);
    } catch (e) {
      return Result.fail(e.message);
    }
  }
}
