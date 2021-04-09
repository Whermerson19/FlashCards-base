import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddFieldFolderIdToList1617996195400 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "list",
      new TableColumn({
        name: "folderId",
        type: "varchar",
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      "list",
      new TableForeignKey({
        name: "LIST-FOLDER_ID",
        columnNames: ["folderId"],
        referencedColumnNames: ["id"],
        referencedTableName: "folders",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("list", "LIST-FOLDER_ID");
    await queryRunner.dropColumn("list", "folderId");
  }
}
