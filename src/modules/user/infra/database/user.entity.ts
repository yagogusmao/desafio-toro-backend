import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn()
  account: number;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column('float')
  balance: number;
}
