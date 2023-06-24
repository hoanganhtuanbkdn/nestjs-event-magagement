// src/articles/entities/article.entity.ts

import { Gender, Role, User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto implements User {
  @ApiProperty() password: string;
  @ApiProperty() id: number;
  @ApiProperty() username: string;
  @ApiProperty() firstName: string;
  @ApiProperty() lastName: string;
  @ApiProperty() email: string;
  @ApiProperty() role: Role;
  @ApiProperty() gender: Gender | null;
  @ApiProperty() isActive: boolean;
  @ApiProperty() createdAt: Date;
}
