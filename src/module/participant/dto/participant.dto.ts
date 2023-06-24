import { ApiProperty } from '@nestjs/swagger';

export class ParticipantDto {
  @ApiProperty() id: number;
  @ApiProperty() createdAt: Date | null;
  @ApiProperty() name: string;
  @ApiProperty() code: string;
  @ApiProperty() position: string | null;
  @ApiProperty() note: string | null;
  @ApiProperty() checkInAt: Date | null;
  @ApiProperty() takeGiftAt: Date | null;
  @ApiProperty() eventId: number;
}
