import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateLocationInput, UpdateLocationInput} from './dto';
import { Location } from './entities';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepo: Repository<Location>,
  ) {}

  async create(createLocationInput: CreateLocationInput): Promise<Location> {
    const location = this.locationRepo.create(createLocationInput);

    await this.locationRepo.save(location);
    
    location.events = [];
    
    return location;
  }

  async findAll() {
    const locations = await this.locationRepo.find({ relations: ['events'] })

    return locations.map(location => ({
    ...location,
    events: location.events || []
  }))
  }

  async findOne(id: number) {
    const location = await this.locationRepo.findOne({where: {id}, relations: ['events']});

    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    return location;
  }

  async update(id: number, updateLocationInput: UpdateLocationInput) {
    delete updateLocationInput['id'];

    const findOne = await this.locationRepo.findOne({ where: {id}, relations: ["events"] });

    const findData: Location = findOne;

    const updatedData = Object.assign(findData, updateLocationInput);

    const data = await this.locationRepo.save(updatedData);

    return data;
  }

  async remove(id: number) {
    const location = await this.locationRepo.findOne({ where: {id}, relations: ["events"] });

    if (!location) throw new NotFoundException('location not Found');

    await this.locationRepo.delete(id);

    return location;
  }
}
