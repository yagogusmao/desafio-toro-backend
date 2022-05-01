import { User } from '../infra/database';
import { CreateUserDTO } from '../Dto';
import { UpdateResult } from 'typeorm';

export interface IUserService {
  createUser(data: CreateUserDTO): Promise<User>;
  getUser(account: number): Promise<User>;
  updateBalance(account: number, amount: number): Promise<UpdateResult>;
}
