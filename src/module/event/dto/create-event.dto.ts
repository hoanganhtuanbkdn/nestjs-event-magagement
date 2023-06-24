import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty() name: string;
  @ApiProperty({ required: false }) organizer?: string;
  @ApiProperty({ required: false }) area?: string;
  @ApiProperty({ required: false }) startDate?: string;
  @ApiProperty({ required: false }) createdAt?: string;
  @ApiProperty({ required: false }) isActive?: boolean;
  @ApiProperty({ required: false }) userId?: number;
}
