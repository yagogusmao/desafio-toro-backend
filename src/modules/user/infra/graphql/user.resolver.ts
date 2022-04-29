import { Resolver, Query } from '@nestjs/graphql';
import { Logger, Inject } from '@nestjs/common';
import { UserType } from './types';
import { IUserService } from '../../interfaces/iUserService';
import { I_USER_SERVICE } from '../../../../shared/utils/constants';

@Resolver(() => UserType)
export class UserResolver {
  private readonly logger = new Logger('User resolver');
  constructor(
    @Inject(I_USER_SERVICE)
    private readonly userService: IUserService,
  ) {}
  @Query(() => UserType)
  async user(account: number): Promise<UserType> {
    this.logger.log('user');

    return this.userService.getUser(account);
  }
}
