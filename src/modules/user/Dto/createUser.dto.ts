export class CreateUserDTO {
  public account: number;

  public cpf: string;

  public name: string;

  public balance: number;

  constructor(account: number, cpf: string, name: string, balance: number) {
    this.account = account;
    this.cpf = cpf;
    this.name = name;
    this.balance = balance;
  }
}
