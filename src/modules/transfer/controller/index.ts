import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Transfer } from '../infra/database';
import { TransferService } from '../service';

@Controller('spb')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post('/events')
  createTransfer(@Body() body): Promise<Transfer> {
    const target_account = body.target.account;
    const target_bank = body.target.bank;
    const target_branch = body.target.branch;
    const origin_bank = body.origin.bank;
    const origin_branch = body.origin.branch;
    const origin_cpf = body.origin.cpf;
    const { event, amount } = body;
    return this.transferService.createTransfer({
      target_account,
      target_bank,
      target_branch,
      origin_bank,
      origin_branch,
      origin_cpf,
      event,
      amount,
    });
  }

  @Get(':account')
  getTransfersByUser(@Param() params): Promise<Transfer[]> {
    const { account } = params;
    return this.transferService.getTransfersByUser(account);
  }
}
