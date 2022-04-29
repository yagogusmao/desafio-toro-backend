import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ObjectType()
export class User {
  @Field(() => ID)
  @IsNotEmpty()
  account: number;

  @Field()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsNotEmpty()
  cpf: string;

  @Field()
  @IsNotEmpty()
  balance: number;
}
