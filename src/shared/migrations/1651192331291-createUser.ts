import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUser1651192331291 implements MigrationInterface {
  public async up(queryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'account',
            type: 'varchar(6)',
            isPrimary: true,
          },
          {
            name: 'balance',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'cpf',
            type: 'varchar(11)',
            isNullable: false,
            isUnique: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
