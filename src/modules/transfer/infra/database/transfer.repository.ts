import { AbstractRepository, EntityRepository } from 'typeorm';
import { ITransferRepository } from '../../interfaces/iTransferRepository';
import { Transfer } from './transfer.entity';
import { Logger } from '@nestjs/common';

@EntityRepository(Transfer)
export class TransferRepository
  extends AbstractRepository<Transfer>
  implements ITransferRepository
{
  private readonly logger = new Logger('Transfer repository');

  createTransfer(
    target_bank: string,
    target_branch: string,
    target_account: string,
    origin_bank: string,
    origin_branch: string,
    origin_cpf: string,
    event: string,
    amount: number,
  ): Promise<Transfer> {
    this.logger.log(
      'createTransfer: ' +
        JSON.stringify({
          target_bank,
          target_branch,
          target_account,
          origin_bank,
          origin_branch,
          origin_cpf,
          event,
          amount,
        }),
    );
    const transfer = this.repository.create({
      target_bank,
      target_branch,
      target_account,
      origin_bank,
      origin_branch,
      origin_cpf,
      event,
      amount,
    });

    return this.repository.save(transfer);
  }
  async getTransfersByUser(account: string): Promise<Transfer[]> {
    this.logger.log('getTransfersByUser: ' + account);

    const transfers = await this.repository.find({
      where: { target_account: account },
    });

    return transfers;
  }
}
