import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsUUID } from 'class-validator';

export class CheckoutDto {
  @ApiProperty()
  @IsUUID()
  reservationId!: string;

  @ApiProperty()
  @IsUrl()
  successUrl!: string;

  @ApiProperty()
  @IsUrl()
  cancelUrl!: string;
}
