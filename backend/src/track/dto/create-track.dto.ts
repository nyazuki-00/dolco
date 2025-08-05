import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  spotifyId: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  artist: string;

  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  @IsNotEmpty()
  @IsString()
  spotifyUrl: string;

  @IsOptional()
  @IsString()
  albumName?: string;

  @IsOptional()
  @IsString()
  memo?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
