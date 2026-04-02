import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateScreeningDto {
  @ApiProperty()
  @IsUUID()
  movieId!: string;

  @ApiProperty()
  @IsUUID()
  hallId!: string;

  @ApiProperty({ example: '2024-12-01T18:00:00.000Z' })
  @IsDateString()
  startTime!: string;

  @ApiProperty({ example: '2024-12-01T20:30:00.000Z' })
  @IsDateString()
  endTime!: string;

  @ApiProperty({ example: 'EVENING' })
  @IsString()
  @IsNotEmpty()
  pricingGroup!: string;
}
