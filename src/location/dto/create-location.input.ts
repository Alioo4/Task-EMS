import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateLocationInput {
  @IsAlpha()
  @IsNotEmpty()
  @Field()
  name: string;
}
