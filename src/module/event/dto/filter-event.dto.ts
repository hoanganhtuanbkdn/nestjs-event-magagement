import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { DefaultFilter } from 'src/module/user/dto/filter-user.dto';

export class FilterEvent extends DefaultFilter {
  @ApiProperty({
    required: false,
  })
  cursor?: Prisma.EventWhereUniqueInput;
  @ApiProperty({
    required: false,
  })
  where?: Prisma.EventWhereInput;
  @ApiProperty({
    required: false,
  })
  orderBy?: Prisma.EventOrderByWithRelationInput;
}
