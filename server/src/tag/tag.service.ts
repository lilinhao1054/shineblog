import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Between, FindOptionsWhere, Like, Repository } from 'typeorm';
import { Page } from 'src/common/Page';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}
  createBatch(tags: Tag[]) {
    return this.tagRepository.save(tags);
  }

  findAll() {
    return this.tagRepository.find();
  }

  findOne(id: number) {
    return this.tagRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const tag = await this.tagRepository.findOneBy({ id });
    return this.tagRepository.remove(tag);
  }

  async searchPage(
    current: number,
    pageSize: number,
    name: string,
    startTime: Date,
    endTime: Date,
  ) {
    const page = new Page<Tag>(current, pageSize);

    const whereOptions: FindOptionsWhere<Tag> = {};

    if (!isNaN(startTime.getTime()) && !isNaN(endTime.getTime()))
      whereOptions.createTime = Between(startTime, endTime);
    if (name) whereOptions.name = Like(`%${name}%`);

    const [records, total] = await this.tagRepository.findAndCount({
      skip: (page.current - 1) * page.pageSize,
      take: page.pageSize,
      where: whereOptions,
    });
    page.records = records;
    page.total = total;
    return page;
  }

  async count() {
    return this.tagRepository.count();
  }
}
