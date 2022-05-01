import { AbstractRepository, EntityRepository, UpdateResult } from 'typeorm';
import { IUserRepository } from '../../interfaces/iUserRepository';
import { User } from './user.entity';
import { Logger } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository
  extends AbstractRepository<User>
  implements IUserRepository
{
  private readonly logger = new Logger('User repository');

  async getUserByCpf(cpf: string): Promise<User> {
    this.logger.log('getUserByCpf: ' + cpf);
    const user = await this.repository.findOne({ where: { cpf } });
    return user;
  }

  async updateBalance(account: number, balance: number): Promise<UpdateResult> {
    this.logger.log('getUser: ' + account);
    const user = await this.repository.update({ account }, { balance });
    return user;
  }

  async getUser(account: number): Promise<User> {
    this.logger.log('getUser: ' + account);
    const user = await this.repository.findOne({ where: { account } });
    return user;
  }

  createUser(
    account: number,
    name: string,
    cpf: string,
    balance: number,
  ): Promise<User> {
    this.logger.log(
      'createUser: ' + JSON.stringify({ account, cpf, name, balance }),
    );

    const user = this.repository.create({
      account: account,
      cpf: cpf,
      name: name,
      balance: balance,
    });

    return this.repository.save(user);
  }
}
