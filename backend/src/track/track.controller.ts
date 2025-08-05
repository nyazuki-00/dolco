import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTrackDto: CreateTrackDto, @Req() req: any) {
    const userId = req.user['userId'];
    return this.trackService.create(createTrackDto, userId);
  }

  @Get('search')
  async search(@Query('q') q: string) {
    return this.trackService.searchTrack(q);
  }

  @Get(':ownerCode')
  getByOwnerCode(@Param('ownerCode') ownerCode: string) {
    return this.trackService.findByOwnerCode(ownerCode);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trackService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.trackService.update(+id, updateTrackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trackService.remove(+id);
  }
}
