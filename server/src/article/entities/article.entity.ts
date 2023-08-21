import { Category } from 'src/category/entities/category.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 40,
  })
  title: string;

  @Column({ length: 10000 })
  content: string;

  @Column()
  abstract: string;

  @Column()
  cover: string;

  @CreateDateColumn()
  pubTime: Date;

  @Column({ default: 0 })
  pageView: number;

  @ManyToMany(() => Tag, (tag) => tag.articles)
  @JoinTable()
  tags: Tag[];

  @ManyToOne(() => Category, (category) => category.articles)
  category: Category;
}
