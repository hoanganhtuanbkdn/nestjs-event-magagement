import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { ParticipantDto } from './dto/participant.dto';
import { FilterParticipant } from './dto/filter-user.dto';

@ApiTags('Participant')
@ApiBearerAuth('defaultBearerAuth')
@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantService.create(
      createParticipantDto as unknown as any,
    );
  }

  @Get()
  @ApiOkResponse({ type: ParticipantDto, isArray: true })
  @ApiQuery({
    type: () => FilterParticipant,
    style: 'deepObject',
    explode: true,
  })
  findAll(
    @Param('params')
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.ParticipantWhereUniqueInput;
      where?: Prisma.ParticipantWhereInput;
      orderBy?: Prisma.ParticipantOrderByWithRelationInput;
    },
  ) {
    return this.participantService.findAll(params ?? {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.participantService.findById(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateParticipantDto,
  ) {
    return this.participantService.updateById(
      +id,
      updateParticipantDto as unknown as any,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participantService.delete(+id);
  }
}
