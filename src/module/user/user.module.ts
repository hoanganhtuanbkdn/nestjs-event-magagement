import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { PrismaModule } from 'src/database/prisma.module';
import { UserRepository } from './user.repository';

@Module({
  imports: [PrismaModule],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserRepository, UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UserController);
  }
}
