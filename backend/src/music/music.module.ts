import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { HttpModule } from '@nestjs/axios';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Music, User]), HttpModule],
  controllers: [MusicController],
  providers: [MusicService],
})
export class MusicModule {}
