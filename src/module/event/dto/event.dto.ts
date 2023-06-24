// src/articles/entities/article.entity.ts

import { Event } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class EventDto implements Event {
  @ApiProperty()
  id: number;

  @ApiProperty() name: string;
  @ApiProperty() organizer: string;
  @ApiProperty() area: string;
  @ApiProperty() startDate: Date;
  @ApiProperty() createdAt: Date;
  @ApiProperty() isActive: boolean;

  @ApiProperty() updatedAt: Date;
  @ApiProperty() userId: number;
}
