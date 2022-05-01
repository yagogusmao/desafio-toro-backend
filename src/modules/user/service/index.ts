import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDTO } from '../Dto';
import { IUserRepository, IUserService } from '../interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository, User } from '../infra/database';
import { UpdateResult } from 'typeorm';

@Injectable()
export class UserService implements IUserService {
  private readonly logger = new Logger('User service');
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  updateBalance(account: string, amount: number): Promise<UpdateResult> {
    this.logger.log('updateBalance');
    return this.userRepository.updateBalance(account, amount);
  }

  async createUser({
    account,
    cpf,
    name,
    balance,
  }: CreateUserDTO): Promise<User> {
    this.logger.log('createUser');
    const userAccount = await this.userRepository.getUser(account);
    const userCpf = await this.userRepository.getUserByCpf(cpf);

    if (userAccount || userCpf) {
      throw new BadRequestException('User exist');
    }

    return this.userRepository.createUser(account, name, cpf, balance);
  }

  async getUser(account: string): Promise<User> {
    this.logger.log('getUser: ' + account);
    const user = await this.userRepository.getUser(account);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
