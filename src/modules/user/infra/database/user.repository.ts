import { AbstractRepository, EntityRepository } from 'typeorm';
import { IUserRepository } from '../../interfaces/iUserRepository';
import { User } from './user.entity';
import { Logger } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository
  extends AbstractRepository<User>
  implements IUserRepository
{
  private readonly logger = new Logger('User repository');

  async getUser(account: number): Promise<User> {
    this.logger.log('getUser: ' + account);

    const user = await this.repository.findOne({ where: { account }});

    return user;
  }
  
  createUser(account: number, cpf: string, name: string, balance: number): Promise<User> {
    this.logger.log('createUser: ' + JSON.stringify({ account, cpf, name, balance }));
    const user = this.repository.create({
        account: account,
        cpf: cpf,
        name: name,
        balance: balance
    });

    return this.repository.save(user);
  }
}