import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createWatterBill1697927730798 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "water_bill",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    isGenerated: true,
                },
                {
                    name: "liter",
                    type: "integer",
                    isNullable: false,
                },
                {
                    name: "value",
                    type: "decimal",
                    precision: 10,
                    scale: 2,
                    isNullable: false,
                },
                {
                    name: "data",
                    type: "date",
                    isNullable: false,
                },
                {
                    name: "user_id",
                    type: "uuid",
                    isNullable: false,
                },
            ],
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("water_bill");
    }

}
