import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import { ConfigModule } from '@nestjs/config';

import cors from 'cors';
import helmet from 'helmet';

import { EventModule } from './module/event/event.module';
import { UserModule } from './module/user/user.module';

import configuration from './config/configuration';
import { redisStore } from 'cache-manager-redis-yet';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './module/auth/auth.module';
import { ParticipantModule } from './module/participant/participant.module';

@Module({
  imports: [
    EventModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
    CacheModule.register(),
    PrismaModule,
    ParticipantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
