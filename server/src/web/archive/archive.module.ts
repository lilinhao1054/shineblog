import { Module } from '@nestjs/common';
import { ArchiveController } from './archive.controller';
import { ArticleModule } from 'src/article/article.module';

@Module({
  imports: [ArticleModule],
  controllers: [ArchiveController],
})
export class ArchiveModule {}
