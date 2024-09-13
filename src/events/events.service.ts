import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager'
import { Cache } from 'cache-manager'

import { CreateEventInput, UpdateEventInput } from './dto';
import { Event } from './entities';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepo: Repository<Event>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createEventInput: CreateEventInput): Promise<Event> {
    const event = this.eventRepo.create(createEventInput);

    const savedEvent = await this.eventRepo.save(event);

    return savedEvent;
  }

  async findAll(
    startDate?: Date,
    endDate?: Date,
    location?: number,
  ): Promise<Event[]> {
    const queryBuilder = this.eventRepo.createQueryBuilder('event');

    if (location)
      queryBuilder.andWhere('event.locationId = :location', { location });

    if (startDate)
      queryBuilder.where('event.startDate >= :startDate', { startDate });

    if (endDate)
      queryBuilder.andWhere('event.endDate <= :endDate', { endDate });

    return await queryBuilder.getMany();
  }

  async findOne(id: number) {
    const event = await this.eventRepo.findOneBy({ id });

    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    return event;
  }

  async update(id: number, updateEventInput: UpdateEventInput) {
    delete updateEventInput['id'];

    const findOne = await this.eventRepo.findOneBy({ id });

    const findData: Event = findOne;

    const updatedData = Object.assign(findData, updateEventInput);

    const data = await this.eventRepo.save(updatedData);

    return data;
  }

  async remove(id: number) {
    const event = await this.eventRepo.findOneBy({ id });

    if (!event) throw new NotFoundException('event not Found');

    await this.eventRepo.delete(id);

    return event;
  }
}
