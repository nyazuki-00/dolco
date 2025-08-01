import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Music } from '../../music/entities/music.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  ownerCode: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => Music, (music) => music.user)
  musics: Music[];
}
