import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from 'src/category/category.service';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [CategoryModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class WebCategoryModule {}
