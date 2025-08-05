import { Module } from '@nestjs/common';
import { Track } from './entities/track.entity';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Track, User]), HttpModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
