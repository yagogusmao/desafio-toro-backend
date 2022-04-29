import { Entity, Column, PrimaryColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
@ObjectType()
@Entity('users')
export class User {
  @Field()
  @PrimaryColumn()
  account: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  cpf: string;

  @Field()
  @Column()
  balance: number;
}
