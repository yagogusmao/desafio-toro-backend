import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transfers')
export class Transfer {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  target_bank: number;

  @Column()
  target_branch: number;

  @Column()
  target_account: number;

  @Column()
  origin_bank: number;

  @Column()
  origin_branch: number;

  @Column()
  origin_cpf: string;

  @Column()
  event: string;

  @Column('float')
  amount: number;
}
