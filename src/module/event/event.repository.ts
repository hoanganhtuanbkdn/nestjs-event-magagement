import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma, Event } from '@prisma/client';

@Injectable()
export class EventRepository {
  constructor(private prisma: PrismaService) {}

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EventWhereUniqueInput;
    where?: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithRelationInput;
  }): Promise<Event[]> {
    const { skip, take, cursor, where, orderBy } = params;

    return this.prisma.event.findMany({ skip, take, cursor, where, orderBy });
  }

  async create(params: { data: Prisma.EventCreateInput }): Promise<Event> {
    const { data } = params;
    return this.prisma.event.create({
      data: {
        ...data,
        startDate: data?.startDate ? data?.startDate : undefined,
      },
    });
  }

  async update(params: {
    where: Prisma.EventWhereUniqueInput;
    data: Prisma.EventUpdateInput;
  }): Promise<Event> {
    const { where, data } = params;
    return this.prisma.event.update({ where, data });
  }

  async delete(params: {
    where: Prisma.EventWhereUniqueInput;
  }): Promise<Event> {
    const { where } = params;
    return this.prisma.event.delete({ where });
  }
}
