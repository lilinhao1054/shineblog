import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { TagModule } from 'src/tag/tag.module';
import { ArticleModule } from 'src/article/article.module';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [CategoryModule, TagModule, ArticleModule],
  controllers: [DashboardController],
})
export class DashboardModule {}
