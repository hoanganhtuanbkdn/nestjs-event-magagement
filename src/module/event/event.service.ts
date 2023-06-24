import { Injectable } from '@nestjs/common';
import { Event, Prisma } from '@prisma/client';
import { omit } from 'lodash';
import { EventRepository } from './event.repository';

@Injectable()
export class EventService {
  constructor(private repository: EventRepository) {}

  async create(data: Event) {
    const event = await this.repository.create({
      data: {
        ...omit(data, 'userId'),
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    });

    return event;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EventWhereUniqueInput;
    where?: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithRelationInput;
  }) {
    const events = await this.repository.findAll(params);
    return events;
  }

  async findById(id: number) {
    const event = await this.repository.findAll({
      where: {
        id,
      },
    });
    return event;
  }

  async updateById(id: number, data: Event) {
    const event = await this.repository.update({
      where: {
        id,
      },
      data,
    });

    return event;
  }

  async delete(id: number) {
    return await this.repository.delete({
      where: {
        id,
      },
    });
  }
}
