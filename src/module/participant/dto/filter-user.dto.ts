import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class DefaultFilter {
  @ApiProperty({
    required: false,
  })
  skip?: number;
  @ApiProperty({
    required: false,
  })
  take?: number;
}

export class FilterParticipant extends DefaultFilter {
  @ApiProperty({
    required: false,
  })
  cursor?: Prisma.ParticipantWhereUniqueInput;
  @ApiProperty({
    required: false,
  })
  where?: Prisma.ParticipantWhereInput;
  @ApiProperty({
    required: false,
  })
  orderBy?: Prisma.ParticipantOrderByWithRelationInput;
}
