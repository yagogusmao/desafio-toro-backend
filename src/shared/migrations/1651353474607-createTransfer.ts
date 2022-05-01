import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTransfer1651353474607 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transfers',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'target_bank',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'target_branch',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'target_account',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'origin_bank',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'origin_branch',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'origin_cpf',
            type: 'varchar(11)',
            isNullable: false,
          },
          {
            name: 'event',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'amount',
            type: 'float',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tranfers');
  }
}
