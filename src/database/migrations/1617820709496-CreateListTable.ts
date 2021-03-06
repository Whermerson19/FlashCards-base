import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateListTable1617820709496 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "list",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "title",
            type: "varchar",
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

    await queryRunner.createForeignKey(
      "list",
      new TableForeignKey({
        name: "LIST-USER_ID",
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("list", "LIST-USER_ID");
    await queryRunner.dropTable("list");
  }
}
