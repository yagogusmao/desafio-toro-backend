import { Transfer } from '../infra/database';
import { CreateTransferDTO } from '../Dto';

export interface ITransferService {
  createTransfer(data: CreateTransferDTO): Promise<Transfer>;
  getTransfersByUser(account: string): Promise<Transfer[]>;
}
