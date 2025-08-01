import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Music } from './entities/music.entity';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(Music)
    private musicRepository: Repository<Music>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private http: HttpService,
    private config: ConfigService,
  ) {}

  async create(dto: CreateMusicDto, userId: number) {
    const music = this.musicRepository.create({ ...dto, userId });
    return this.musicRepository.save(music);
  }

  findAll() {
    return `This action returns all music`;
  }

  findOne(id: number) {
    return `This action returns a #${id} music`;
  }

  async findByOwnerCode(ownerCode: string) {
    const user = await this.userRepository.findOne({
      where: { ownerCode: ownerCode },
    });
    if (!user) throw new NotFoundException('オーナーが見つかりません');

    return this.musicRepository.find({
      where: { user: user },
      order: { createdAt: 'DESC' },
    });
  }

  update(id: number, updateMusicDto: UpdateMusicDto) {
    return `This action updates a #${id} music`;
  }

  remove(id: number) {
    return `This action removes a #${id} music`;
  }

  async searchTrack(query: string) {
    const clientId = this.config.get<string>('SPOTIFY_CLIENT_ID');
    const clientSecret = this.config.get<string>('SPOTIFY_CLIENT_SECRET');

    const tokenRes = await firstValueFrom(
      this.http.post(
        'https://accounts.spotify.com/api/token',
        'grant_type=client_credentials',
        {
          headers: {
            Authorization:
              'Basic ' +
              Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      ),
    );

    const accessToken = tokenRes.data.access_token;

    const searchRes = await firstValueFrom(
      this.http.get('https://api.spotify.com/v1/search', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: query,
          type: 'track',
          limit: 10,
        },
      }),
    );

    return searchRes.data;
  }
}
