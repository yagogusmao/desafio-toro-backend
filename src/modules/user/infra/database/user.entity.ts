import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn()
  account: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column('float')
  balance: number;
}
