import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { ParticipantRepository } from './participant.repository';
import { PrismaModule } from 'src/database/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ParticipantController],
  providers: [ParticipantRepository, ParticipantService],
  exports: [ParticipantService],
})
export class ParticipantModule {}
