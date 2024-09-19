import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Event } from '../../events/entities';
import { Matches } from 'class-validator';

@Entity('locations')
@ObjectType()
export class Location {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => Event, (event) => event.location)
  @Field((type) => [Event], { nullable: 'items' })
  events: Event[];
}
