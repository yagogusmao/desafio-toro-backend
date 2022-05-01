import { User } from '../infra/database';
import { CreateUserDTO } from '../Dto';
import { UpdateResult } from 'typeorm';

export interface IUserService {
  createUser(data: CreateUserDTO): Promise<User>;
  getUser(account: string): Promise<User>;
  getUserByCpf(cpf: string): Promise<User>;
  updateBalance(account: string, amount: number): Promise<UpdateResult>;
}
