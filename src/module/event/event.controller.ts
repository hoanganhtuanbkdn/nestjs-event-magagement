import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EventService } from './event.service';
import { Event, Prisma } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { EventDto } from './dto/event.dto';
import { FilterEvent } from './dto/filter-event.dto';
import { CreateEventDto } from './dto/create-event.dto';

@ApiTags('Event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiBearerAuth('defaultBearerAuth')
  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto as unknown as Event);
  }

  @Get()
  @ApiOkResponse({ type: EventDto, isArray: true })
  @ApiQuery({
    type: () => FilterEvent,
    style: 'deepObject',
    explode: true,
  })
  findAll(
    @Param('params')
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.EventWhereUniqueInput;
      where?: Prisma.EventWhereInput;
      orderBy?: Prisma.EventOrderByWithRelationInput;
    },
  ) {
    return this.eventService.findAll(params ?? {});
  }

  @Get(':id')
  @ApiOkResponse({ type: EventDto })
  findOne(@Param('id') id: string) {
    return this.eventService.findById(+id);
  }

  @ApiBearerAuth('defaultBearerAuth')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: Event) {
    return this.eventService.updateById(+id, updateEventDto);
  }

  @ApiBearerAuth('defaultBearerAuth')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.delete(+id);
  }
}
