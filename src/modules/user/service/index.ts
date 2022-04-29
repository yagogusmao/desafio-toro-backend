import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from '../Dto';
import { IUserRepository, IUserService } from '../interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository, User } from '../infra/database';

@Injectable()
export class UserService implements IUserService {
  private readonly logger = new Logger('User service');
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}
  async createUser({
    account,
    cpf,
    name,
    balance,
  }: CreateUserDTO): Promise<User> {
    this.logger.log('createUser');
    return this.userRepository.createUser(account, name, cpf, balance);
  }
  async getUser(account: number): Promise<User> {
    this.logger.log('getUser' + account);
    const user = await this.userRepository.getUser(account);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
