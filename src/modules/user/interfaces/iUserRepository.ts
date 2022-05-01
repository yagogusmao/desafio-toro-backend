import { UpdateResult } from 'typeorm';
import { User } from '../infra/database';

export interface IUserRepository {
  createUser(
    account: string,
    name: string,
    cpf: string,
    balance: number,
  ): Promise<User>;
  getUser(account: string): Promise<User>;
  getUserByCpf(cpf: string): Promise<User>;
  updateBalance(account: string, amount: number): Promise<UpdateResult>;
}
