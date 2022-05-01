export class CreateUserDTO {
  public account: string;

  public cpf: string;

  public name: string;

  public balance: number;

  constructor(account: string, cpf: string, name: string, balance: number) {
    this.account = account;
    this.cpf = cpf;
    this.name = name;
    this.balance = balance;
  }
}
