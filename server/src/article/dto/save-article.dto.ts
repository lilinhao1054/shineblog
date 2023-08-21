import { Transform } from 'class-transformer';

export class SaveArticleDto {
  @Transform(({ value }) => parseInt(value))
  id?: number;

  title: string;

  content: string;

  abstract: string;

  cover: string;

  @Transform(({ value }) => value.map((item: string) => parseInt(item)))
  tagIds: number[];

  @Transform(({ value }) => parseInt(value))
  categoryId: number;
}
