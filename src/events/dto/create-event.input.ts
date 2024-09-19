import { InputType, Field, Int } from '@nestjs/graphql';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateEventInput {
  @IsNotEmpty()
  @IsDate()
  @Field()
  startDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Field()
  endDate: Date;

  @IsNotEmpty()
  @IsString()
  @Field()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Field()
  description: string;

  @IsNotEmpty()
  @IsInt()
  @Field((type) => Int)
  locationId: number;
}
