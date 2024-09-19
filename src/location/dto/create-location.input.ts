import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateLocationInput {
  @IsString()
  @IsNotEmpty()
  @Field()
  name: string;
}
