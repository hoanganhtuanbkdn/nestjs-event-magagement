import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { PrismaModule } from 'src/database/prisma.module';
import { EventRepository } from './event.repository';

@Module({
  imports: [PrismaModule],
  controllers: [EventController],
  providers: [EventRepository, EventService],
  exports: [EventService],
})
export class EventModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(EventController);
  }
}
