import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from '../infra/database';
import { UserService } from '../service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':account')
  getUser(@Param() params): Promise<User> {
    const { account } = params;
    return this.userService.getUser(Number(account));
  }

  @Post()
  createUser(@Body() body): Promise<User> {
    const { account, name, cpf, balance } = body;
    return this.userService.createUser({ account, name, cpf, balance });
  }
}
