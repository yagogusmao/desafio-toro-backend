import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, Provider } from '@nestjs/common';
import { TransferRepository } from './infra/database/transfer.repository';
import { TransferService } from './service';
import { UserModule } from '../user/user.module';
import { I_TRANSFER_SERVICE } from '../../shared/utils/constants';
import { TransferController } from './controller';

const transferServiceProvider: Provider = {
  provide: I_TRANSFER_SERVICE,
  useClass: TransferService,
};

@Module({
  imports: [TypeOrmModule.forFeature([TransferRepository]), UserModule],
  providers: [transferServiceProvider, TransferService],
  controllers: [TransferController],
  exports: [transferServiceProvider],
})
export class TransferModule {}
