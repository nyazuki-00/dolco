import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  spotifyId: string;

  @Column()
  title: string;

  @Column()
  artist: string;

  @Column()
  imageUrl: string;

  @Column()
  spotifyUrl: string;

  @Column({ nullable: true })
  albumName: string;

  @Column({ nullable: true })
  memo: string;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;
}
