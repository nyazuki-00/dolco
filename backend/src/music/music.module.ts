import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Music } from './entities/music.entity';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Music]), HttpModule],
  controllers: [MusicController],
  providers: [MusicService],
})
export class MusicModule {}
