import { Controller, Get, UseGuards } from '@nestjs/common';
import { Result } from 'src/common/Result';
import { AuthGuard } from '@nestjs/passport';
import { TagService } from 'src/tag/tag.service';
import { ArticleService } from 'src/article/article.service';
import { DashboardDto } from './dto/dashboard.dto';
import { CategoryService } from 'src/category/category.service';

@UseGuards(AuthGuard('jwt'))
@Controller('admin/dashboard')
export class DashboardController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly tagService: TagService,
    private readonly articleService: ArticleService,
  ) {}

  @Get()
  async getDashBoard() {
    try {
      const dashboardDto = new DashboardDto();
      const articleNum = await this.articleService.count();
      const tagNum = await this.tagService.count();
      const categoryNum = await this.categoryService.count();
      dashboardDto.articleNum = articleNum;
      dashboardDto.tagNum = tagNum;
      dashboardDto.categoryNum = categoryNum;
      const totalPageView = await this.articleService.getTotalPageView();
      dashboardDto.totalPageView = totalPageView;
      const pubData = await this.articleService.getPubData();
      dashboardDto.articlePubData = pubData;
      const pageViewData = await this.articleService.getPageViewData();
      dashboardDto.pageViewData = pageViewData;
      return Result.success(dashboardDto);
    } catch (e) {
      return Result.fail('获取仪表盘数据失败');
    }
  }
}
