import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';
import { User } from '../user/entities/user.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private http: HttpService,
    private config: ConfigService,
  ) {}

  async create(dto: CreateTrackDto, userId: number) {
    const track = this.trackRepository.create({ ...dto, userId });
    return this.trackRepository.save(track);
  }

  findAll() {
    return `This action returns all track`;
  }

  findOne(id: number) {
    return `This action returns a #${id} track`;
  }

  async findByOwnerCode(ownerCode: string) {
    const user = await this.userRepository.findOne({
      where: { ownerCode: ownerCode },
    });
    if (!user) throw new NotFoundException('オーナーが見つかりません');

    return this.trackRepository.find({
      where: { user: user },
      order: { createdAt: 'DESC' },
    });
  }

  update(id: number, updateTrackDto: UpdateTrackDto) {
    return `This action updates a #${id} track`;
  }

  remove(id: number) {
    return `This action removes a #${id} track`;
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
