import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleModule } from 'src/article/article.module';

@Module({
  imports: [ArticleModule],
  controllers: [ArticleController],
})
export class WebArticleModule {}
