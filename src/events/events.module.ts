import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EventsService } from './events.service';
import { EventsResolver } from './events.resolver';
import { Event } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event])
   ],
  providers: [EventsResolver, EventsService],
  exports: [EventsService],
})
export class EventsModule {}
