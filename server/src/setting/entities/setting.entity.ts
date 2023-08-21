import { Column, Entity, PrimaryColumn } from 'typeorm';
import { Transform } from 'class-transformer';

@Entity()
export class Setting {
  @PrimaryColumn()
  blogName: string;

  @Column()
  authorName: string;

  @Column()
  authorAvatar: string;

  @Column({ nullable: true })
  introduction: string;

  @Column({ default: false })
  @Transform(({ value }) => value === 'true')
  showGitHub: boolean;

  @Column({ nullable: true })
  gitHubUrl: string;

  @Column({ default: false })
  @Transform(({ value }) => value === 'true')
  showCSDN: boolean;

  @Column({ nullable: true })
  CSDNUrl: string;

  @Column({ default: false })
  @Transform(({ value }) => value === 'true')
  showGitee: boolean;

  @Column({ nullable: true })
  giteeUrl: string;

  @Column({ default: false })
  @Transform(({ value }) => value === 'true')
  showZhiHu: boolean;

  @Column({ nullable: true })
  zhiHuUrl: string;
}
