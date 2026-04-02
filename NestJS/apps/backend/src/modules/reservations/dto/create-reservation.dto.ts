import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsUUID, Min } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty()
  @IsUUID()
  screeningId!: string;

  @ApiProperty()
  @IsUUID()
  userId!: string;

  @ApiProperty({ example: ['seat-uuid-1', 'seat-uuid-2'] })
  @IsArray()
  seatIds!: string[];

  @ApiProperty({ example: 1200 })
  @IsNumber()
  @Min(0)
  totalAmount!: number;
}
