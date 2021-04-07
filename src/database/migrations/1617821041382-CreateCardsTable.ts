import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateCardsTable1617821041382 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cards",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "front",
            type: "varchar",
          },
          {
            name: "versus",
            type: "varchar",
          },
          {
            name: "listId",
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
      "cards",
      new TableForeignKey({
        name: "CARDS-LIST_ID",
        columnNames: ["listId"],
        referencedColumnNames: ["id"],
        referencedTableName: "list",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "cards",
      new TableForeignKey({
        name: "CARDS-USER_ID",
        columnNames: ["userId"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("cards", "CARDS-USER_ID");
    await queryRunner.dropForeignKey("cards", "CARDS-LIST_ID");
    await queryRunner.dropTable("cards");
  }
}
