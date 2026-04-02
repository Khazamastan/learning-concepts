import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsDateString, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({ example: 'Inception' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'Dom Cobb is a thief...' })
  @IsString()
  @IsNotEmpty()
  synopsis!: string;

  @ApiProperty({ example: 'Sci-Fi' })
  @IsString()
  @IsNotEmpty()
  genre!: string;

  @ApiProperty({ example: ['Christopher Nolan'] })
  @IsArray()
  cast!: string[];

  @ApiProperty({ example: '2024-11-01' })
  @IsDateString()
  releaseDate!: string;

  @ApiProperty({ example: 'https://image.tmdb.org/t/p/w500/poster.jpg', required: false })
  @IsUrl()
  @IsOptional()
  posterUrl?: string;
}
