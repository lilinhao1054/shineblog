import { Module } from '@nestjs/common';
import { WebArticleModule } from './article/article.module';
import { WebCategoryModule } from './category/category.module';
import { WebSettingModule } from './setting/setting.module';
import { WebTagModule } from './tag/tag.module';
import { ArchiveModule } from './archive/archive.module';

@Module({
  imports: [
    WebArticleModule,
    WebCategoryModule,
    WebSettingModule,
    WebTagModule,
    ArchiveModule,
  ],
})
export class WebModule {}
