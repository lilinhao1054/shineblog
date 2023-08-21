import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, Like, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Page } from 'src/common/Page';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.save(createCategoryDto);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return this.categoryRepository.findOneBy({ id });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  remove(id: number) {
    return this.categoryRepository.delete(id);
  }

  async searchPage(
    current: number,
    pageSize: number,
    name: string,
    startTime: Date,
    endTime: Date,
  ) {
    const page = new Page<Category>(current, pageSize);

    const whereOptions: FindOptionsWhere<Category> = {};

    if (!isNaN(startTime.getTime()) && !isNaN(endTime.getTime()))
      whereOptions.createTime = Between(startTime, endTime);
    if (name) whereOptions.name = Like(`%${name}%`);

    const [records, total] = await this.categoryRepository.findAndCount({
      skip: (page.current - 1) * page.pageSize,
      take: page.pageSize,
      where: whereOptions,
    });
    page.records = records;
    page.total = total;
    return page;
  }

  async count() {
    return this.categoryRepository.count();
  }
}
