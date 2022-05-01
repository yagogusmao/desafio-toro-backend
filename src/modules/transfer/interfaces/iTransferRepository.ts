import { Transfer } from '../infra/database';

export interface ITransferRepository {
  createTransfer(
    target_bank: number,
    target_branch: number,
    target_account: number,
    origin_bank: number,
    origin_branch: number,
    origin_cpf: string,
    event: string,
    amount: number,
  ): Promise<Transfer>;
  getTransfersByUser(account: number): Promise<Transfer[]>;
}
