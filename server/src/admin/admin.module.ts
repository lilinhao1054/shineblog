import { Module } from '@nestjs/common';
import { AdminArticleModule } from './article/article.module';
import { AdminCategoryModule } from './category/category.module';
import { AdminSettingModule } from './setting/setting.module';
import { AdminTagModule } from './tag/tag.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    AdminArticleModule,
    AdminCategoryModule,
    AdminSettingModule,
    AdminTagModule,
    DashboardModule,
  ],
})
export class AdminModule {}
