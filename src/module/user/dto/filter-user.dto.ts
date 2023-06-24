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

export class FilterUser extends DefaultFilter {
  @ApiProperty({
    required: false,
  })
  cursor?: Prisma.UserWhereUniqueInput;
  @ApiProperty({
    required: false,
  })
  where?: Prisma.UserWhereInput;
  @ApiProperty({
    required: false,
  })
  orderBy?: Prisma.UserOrderByWithRelationInput;
}
