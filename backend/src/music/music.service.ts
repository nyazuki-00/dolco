import { Repository } from 'typeorm';
import { Music } from './entities/music.entity';
import { User } from '../user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(Music)
    private musicRepository: Repository<Music>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByUser(userId: number) {
    return this.musicRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async create(
    title: string,
    artist: string,
    comment: string | undefined,
    userId: number,
  ) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const music = this.musicRepository.create({ title, artist, comment, user });
    return this.musicRepository.save(music);
  }
}
