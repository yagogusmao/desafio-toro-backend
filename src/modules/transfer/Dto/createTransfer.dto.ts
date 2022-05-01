export class CreateTransferDTO {
  public target_bank: string;
  public target_branch: string;
  public target_account: string;

  public origin_bank: string;
  public origin_branch: string;
  public origin_cpf: string;

  public event: string;

  public amount: number;
  constructor(
    target_bank: string,
    target_branch: string,
    target_account: string,
    origin_bank: string,
    origin_branch: string,
    origin_cpf: string,
    event: string,
    amount: number,
  ) {
    this.target_bank = target_bank;
    this.target_branch = target_branch;
    this.target_account = target_account;
    this.origin_bank = origin_bank;
    this.origin_branch = origin_branch;
    this.origin_cpf = origin_cpf;
    this.event = event;
    this.amount = amount;
  }
}
