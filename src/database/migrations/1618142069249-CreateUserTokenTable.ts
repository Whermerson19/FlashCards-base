import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTokenTable1618142069249 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "usersToken",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "token",
            type: "varchar",
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "userId",
            type: "varchar",
          },
          {
            name: "createdAt",
            type: "timestamp with time zone",
            default: "now()",
          },
          {
            name: "updatedAt",
            type: "timestamp with time zone",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("usersToken");
  }
}
