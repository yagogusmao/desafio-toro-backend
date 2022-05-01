import { Transfer } from '../infra/database';

export interface ITransferRepository {
  createTransfer(
    target_bank: string,
    target_branch: string,
    target_account: string,
    origin_bank: string,
    origin_branch: string,
    origin_cpf: string,
    event: string,
    amount: number,
  ): Promise<Transfer>;
  getTransfersByUser(account: string): Promise<Transfer[]>;
}
