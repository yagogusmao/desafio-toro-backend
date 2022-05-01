import { UpdateResult } from 'typeorm';
import { User } from '../infra/database';

export interface IUserRepository {
  createUser(
    account: number,
    name: string,
    cpf: string,
    balance: number,
  ): Promise<User>;
  getUser(account: number): Promise<User>;
  getUserByCpf(cpf: string): Promise<User>;
  updateBalance(account: number, amount: number): Promise<UpdateResult>;
}
