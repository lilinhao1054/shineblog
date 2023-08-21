import { Article } from 'src/article/entities/article.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createTime: Date;

  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[];
}
