import { Injectable } from '@nestjs/common';
import { Participant, Prisma, Event } from '@prisma/client';
import { ParticipantRepository } from './participant.repository';

@Injectable()
export class ParticipantService {
  constructor(private repository: ParticipantRepository) {}

  async create(data: Participant) {
    const Participant = await this.repository.create({
      data: {
        ...data,
        event: {
          connect: {
            id: data.eventId,
          },
        },
      },
    });

    return Participant;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ParticipantWhereUniqueInput;
    where?: Prisma.ParticipantWhereInput;
    orderBy?: Prisma.ParticipantOrderByWithRelationInput;
  }) {
    const Participants = await this.repository.findAll(params);
    return Participants;
  }

  async findById(id: number) {
    const Participant = await this.repository.findAll({
      where: {
        id,
      },
    });
    return Participant;
  }

  async updateById(id: number, data: Participant) {
    const Participant = await this.repository.update({
      where: {
        id,
      },
      data,
    });

    return Participant;
  }

  async delete(id: number) {
    return await this.repository.delete({
      where: {
        id,
      },
    });
  }
}
