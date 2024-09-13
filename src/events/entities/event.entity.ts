import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Location } from 'src/location/entities/location.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events')
@ObjectType()
export class Event {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  startDate: Date;

  @Column()
  @Field()
  endDate: Date;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field((type) => Int)
  locationId: number;

  @ManyToOne(() => Location, (location) => location.events, {
    onDelete: 'CASCADE',
  })
  @Field((type) => Location)
  location: Location;
}
