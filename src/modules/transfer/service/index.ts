import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { CreateTransferDTO } from '../Dto';
import { ITransferRepository, ITransferService } from '../interfaces';
import { IUserService } from '@modules/user/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { TransferRepository, Transfer } from '../infra/database';
import { I_USER_SERVICE } from '@shared/utils/constants';

@Injectable()
export class TransferService implements ITransferService {
  private readonly logger = new Logger('User service');
  constructor(
    @InjectRepository(TransferRepository)
    private readonly transferRepository: ITransferRepository,
    @Inject(I_USER_SERVICE)
    private readonly iUserService: IUserService,
  ) {}

  async createTransfer({
    target_bank,
    target_branch,
    target_account,
    origin_bank,
    origin_branch,
    origin_cpf,
    event,
    amount,
  }: CreateTransferDTO): Promise<Transfer> {
    this.logger.log('createTransfer');
    const user = await this.iUserService.getUser(target_account);
    if (!user) {
      throw new NotFoundException('Target account not found');
    }
    if (user.cpf !== origin_cpf) {
      throw new BadRequestException(
        'User cpf does not match with sent account cpf',
      );
    }
    const newBalance = user.balance + amount;
    return this.iUserService
      .updateBalance(target_account, newBalance)
      .then(() =>
        this.transferRepository.createTransfer(
          target_bank,
          target_branch,
          target_account,
          origin_bank,
          origin_branch,
          origin_cpf,
          event,
          amount,
        ),
      );
  }

  async getTransfersByUser(account: number): Promise<Transfer[]> {
    this.logger.log('getTransfersByUser');
    const user = await this.iUserService.getUser(account);
    if (!user) {
      throw new NotFoundException('Account not found');
    }
    return this.transferRepository.getTransfersByUser(account);
  }
}
