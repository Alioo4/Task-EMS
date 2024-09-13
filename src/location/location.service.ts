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
    return this.locationRepo.save(location);
  }

  async findAll() {
    return await this.locationRepo.find();
  }

  async findOne(id: number) {
    const location = await this.locationRepo.findOneBy({ id });

    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    return location;
  }

  async update(id: number, updateLocationInput: UpdateLocationInput) {
    delete updateLocationInput['id'];

    const findOne = await this.locationRepo.findOneBy({ id });

    const findData: Location = findOne;

    const updatedData = Object.assign(findData, updateLocationInput);

    const data = await this.locationRepo.save(updatedData);

    return data;
  }

  async remove(id: number) {
    const location = await this.locationRepo.findOneBy({ id });

    if (!location) throw new NotFoundException('location not Found');

    await this.locationRepo.delete(id);

    return location;
  }
}
