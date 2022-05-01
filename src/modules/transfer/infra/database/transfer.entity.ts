import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transfers')
export class Transfer {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  target_bank: string;

  @Column()
  target_branch: string;

  @Column()
  target_account: string;

  @Column()
  origin_bank: string;

  @Column()
  origin_branch: string;

  @Column()
  origin_cpf: string;

  @Column()
  event: string;

  @Column('float')
  amount: number;
}
