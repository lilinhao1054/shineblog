import { Inject, Injectable } from '@nestjs/common';
import { SaveArticleDto } from './dto/save-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  FindOptionsWhere,
  LessThan,
  Like,
  MoreThan,
  Repository,
} from 'typeorm';
import { Article } from './entities/article.entity';
import { Page } from 'src/common/Page';
import { Client } from 'minio';
import { nanoid } from 'nanoid';
import { MINIO_CONFIG } from 'src/config/config';
import { Category } from '../category/entities/category.entity';
import { Tag } from '../tag/entities/tag.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @Inject('MINIO') private readonly minioClient: Client,
  ) {}

  async save(file: Express.Multer.File, saveArticleDto: SaveArticleDto) {
    // upload file
    if (file) {
      const uuid = nanoid();
      await this.minioClient.putObject(
        MINIO_CONFIG.MINIO_BUCKET,
        uuid,
        file.buffer,
        {
          fileName: file.originalname,
        },
      );
      saveArticleDto.cover = uuid;
    }

    // preload category
    const category = new Category();
    category.id = saveArticleDto.categoryId;
    await this.articleRepository.preload(category);

    // preload tags
    const tags = saveArticleDto.tagIds.map((tagId) => {
      const tag = new Tag();
      tag.id = tagId;
      return tag;
    });
    const promises = tags.map((tag) => this.articleRepository.preload(tag));
    await Promise.all(promises);

    const article = new Article();
    article.id = saveArticleDto.id;
    article.title = saveArticleDto.title;
    article.content = saveArticleDto.content;
    article.cover = saveArticleDto.cover;
    article.abstract = saveArticleDto.abstract;
    // bulid cascade relationship
    article.category = category;
    article.tags = tags;

    // save (include create & update)
    return this.articleRepository.save(article);
  }

  findAll() {
    return this.articleRepository.find();
  }

  findOne(id: number) {
    return this.articleRepository.findOne({
      where: { id },
      relations: { category: true, tags: true },
    });
  }

  async remove(id: number) {
    const article = await this.articleRepository.findOneBy({ id });
    this.articleRepository.remove(article);
  }

  async searchPageAdmin(
    current: number,
    pageSize: number,
    title: string,
    startTime: Date,
    endTime: Date,
  ) {
    const page = new Page<Article>(current, pageSize);

    const whereOptions: FindOptionsWhere<Article> = {};

    if (!isNaN(startTime.getTime()) && !isNaN(endTime.getTime()))
      whereOptions.pubTime = Between(startTime, endTime);
    if (title) whereOptions.title = Like(`%${title}%`);

    const [records, total] = await this.articleRepository.findAndCount({
      skip: (page.current - 1) * page.pageSize,
      take: page.pageSize,
      where: whereOptions,
    });
    page.records = records;
    page.total = total;
    return page;
  }

  async searchPageWeb(
    current: number,
    pageSize: number,
    categoryId: number,
    tagId: number,
  ) {
    const page = new Page<Article>(current, pageSize);

    const whereOptions: FindOptionsWhere<Article> = {};

    if (categoryId) whereOptions.category = { id: categoryId };
    if (tagId) whereOptions.tags = { id: tagId };

    const [records, total] = await this.articleRepository.findAndCount({
      skip: (page.current - 1) * page.pageSize,
      take: page.pageSize,
      where: whereOptions,
    });
    page.records = records;
    page.total = total;
    return page;
  }

  async getAdjacentArticleById(id: number) {
    const next = await this.articleRepository.findOne({
      select: { id: true, title: true },
      where: {
        id: MoreThan(id),
      },
      order: { id: 'ASC' },
    });
    const prev = await this.articleRepository.findOne({
      select: { id: true, title: true },
      where: {
        id: LessThan(id),
      },
      order: { id: 'DESC' },
    });
    return { prev, next };
  }

  async incPageView(id: number) {
    return this.articleRepository.update(
      { id },
      { pageView: () => 'pageView + 1' },
    );
  }

  async count() {
    return this.articleRepository.count();
  }

  async getTotalPageView() {
    return this.articleRepository.sum('pageView');
  }

  async getPubData() {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(sevenDaysAgo.getTime() + i * 24 * 60 * 60 * 1000);
      dates.push(date.toISOString().substring(0, 10));
    }

    const res = await this.articleRepository
      .createQueryBuilder('Article')
      .select('DATE(pubTime) as date, COUNT(*) as value')
      .where('pubTime >= :sevenDaysAgo', { sevenDaysAgo })
      .groupBy('date')
      .getRawMany();

    return dates.map((date) => {
      const data = res.find(
        (item) =>
          dayjs(item.date).format('YYYY-MM-DD') ===
          dayjs(date).format('YYYY-MM-DD'),
      );
      return {
        date,
        value: data ? data.value : 0,
      };
    });
  }

  async getPageViewData() {
    const today = new Date();
    const sevenDaysAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(sevenDaysAgo.getTime() + i * 24 * 60 * 60 * 1000);
      dates.push(date.toISOString().substring(0, 10));
    }

    const res = await this.articleRepository
      .createQueryBuilder('Article')
      .select('DATE(pubTime) as date, SUM(pageView) as value')
      .where('pubTime >= :sevenDaysAgo', { sevenDaysAgo })
      .groupBy('date')
      .getRawMany();

    return dates.map((date) => {
      const data = res.find(
        (item) =>
          dayjs(item.date).format('YYYY-MM-DD') ===
          dayjs(date).format('YYYY-MM-DD'),
      );
      return {
        date,
        value: data ? data.value : 0,
      };
    });
  }

  async getArchiveData(current: number, pageSize: number) {
    const page = new Page<Article>(current, pageSize);

    const articles = await this.articleRepository.find();

    const archives = articles.reduce((prev, cur) => {
      const i = prev.findIndex(
        (item) =>
          dayjs(item.date).format('YYYY-MM-DD') ===
          dayjs(cur.pubTime).format('YYYY-MM-DD'),
      );
      if (i === -1) prev.push({ date: cur.pubTime, data: [cur] });
      else prev[i].data.push(cur);
      return prev;
    }, []);

    page.records = archives.slice(
      (page.current - 1) * page.pageSize,
      (page.current - 1) * page.pageSize + page.pageSize,
    );
    page.total = archives.length;
    return page;
  }
}
