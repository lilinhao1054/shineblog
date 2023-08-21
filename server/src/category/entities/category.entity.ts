import { Article } from 'src/article/entities/article.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 10,
  })
  name: string;

  @CreateDateColumn()
  createTime: Date;

  @OneToMany(() => Article, (article) => article.category)
  articles: Article[];
}
