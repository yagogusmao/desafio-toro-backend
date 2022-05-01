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
    target_bank: number,
    target_branch: number,
    target_account: number,
    origin_bank: number,
    origin_branch: number,
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
  async getTransfersByUser(account: number): Promise<Transfer[]> {
    this.logger.log('getTransfersByUser: ' + account);

    const transfers = await this.repository.find({
      where: { target_account: account },
    });

    return transfers;
  }
}
