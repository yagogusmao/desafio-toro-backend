export class CreateTransferDTO {
  public target_bank: number;
  public target_branch: number;
  public target_account: number;

  public origin_bank: number;
  public origin_branch: number;
  public origin_cpf: string;

  public event: string;

  public amount: number;
  constructor(
    target_bank: number,
    target_branch: number,
    target_account: number,
    origin_bank: number,
    origin_branch: number,
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
