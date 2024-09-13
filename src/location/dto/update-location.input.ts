import { IsInt, IsNotEmpty } from 'class-validator';
import { CreateLocationInput } from './create-location.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateLocationInput extends PartialType(CreateLocationInput) {
  @IsNotEmpty()
  @IsInt()
  @Field((type) => Int)
  id: number;
}
