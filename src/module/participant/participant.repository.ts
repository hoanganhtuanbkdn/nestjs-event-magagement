import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma, Participant } from '@prisma/client';

export type QueryParticipantParams = {
  skip?: number;
  take?: number;
  cursor?: Prisma.ParticipantWhereUniqueInput;
  where?: Prisma.ParticipantWhereInput;
  orderBy?: Prisma.ParticipantOrderByWithRelationInput;
};

@Injectable()
export class ParticipantRepository {
  constructor(private prisma: PrismaService) {}

  findAll(params: QueryParticipantParams): Promise<Participant[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.participant.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findOne({ where }: QueryParticipantParams): Promise<Participant> {
    return this.prisma.participant.findFirst({
      where,
    });
  }

  async create(params: {
    data: Prisma.ParticipantCreateInput;
  }): Promise<Participant> {
    const { data } = params;
    return this.prisma.participant.create({
      data: {
        ...data,
      },
    });
  }

  async update(params: {
    where: Prisma.ParticipantWhereUniqueInput;
    data: Prisma.ParticipantUpdateInput;
  }): Promise<Participant> {
    const { where, data } = params;
    return this.prisma.participant.update({ where, data });
  }

  async delete(params: {
    where: Prisma.ParticipantWhereUniqueInput;
  }): Promise<Participant> {
    const { where } = params;
    return this.prisma.participant.delete({ where });
  }
}
