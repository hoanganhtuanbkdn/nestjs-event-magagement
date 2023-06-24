import { ApiProperty } from '@nestjs/swagger';

export class CreateParticipantDto {
  @ApiProperty()
  name: string;
  @ApiProperty({ required: false }) position: string | null;
  @ApiProperty({ required: false }) note: string | null;
  @ApiProperty({ required: false }) checkInAt: Date | null;
  @ApiProperty({ required: false }) takeGiftAt: Date | null;
  @ApiProperty() eventId: number;
}
