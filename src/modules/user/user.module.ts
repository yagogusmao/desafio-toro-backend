import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';
import { UserRepository } from './infra/database/user.repository';
import { UserService } from './service';
import { I_USER_SERVICE } from '../../shared/utils/constants';
import { UserController } from './controller';

const userServiceProvider: Provider = {
  provide: I_USER_SERVICE,
  useClass: UserService,
};

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [userServiceProvider, UserService],
  controllers: [UserController],
  exports: [userServiceProvider],
})
export class UserModule {}
