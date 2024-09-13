import { InputType, Field, Int } from '@nestjs/graphql';
import { IsAlpha, IsDate, IsInt, IsNotEmpty } from 'class-validator';

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
  @IsAlpha()
  @Field()
  name: string;

  @IsNotEmpty()
  @IsAlpha()
  @Field()
  description: string;

  @IsNotEmpty()
  @IsInt()
  @Field((type) => Int)
  locationId: number;
}
