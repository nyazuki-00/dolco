import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MusicService } from './music.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get()
  findAll(@Query('userId') userId: string) {
    return this.musicService.findByUser(Number(userId));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() body: { title: string; artist: string; comment?: string },
    @Request() req,
  ) {
    const userId = req.user.userId;
    return this.musicService.create(
      body.title,
      body.artist,
      body.comment,
      userId,
    );
  }
}
