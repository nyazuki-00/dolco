import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Track } from '../../track/entities/track.entity';

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

  @OneToMany(() => Track, (track) => track.user)
  tracks: Track[];
}
