import { User } from '../infra/database';
import { CreateUserDTO } from '../Dto';

export interface IUserService {
  createUser(data: CreateUserDTO): Promise<User>;
  getUser(account: number): Promise<User>;
}
