import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagModule } from 'src/tag/tag.module';

@Module({
  imports: [TagModule],
  controllers: [TagController],
})
export class WebTagModule {}
