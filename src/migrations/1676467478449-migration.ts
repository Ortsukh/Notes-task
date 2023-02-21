import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1676467478449 implements MigrationInterface {
    name = 'migration1676467478449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note_entity" ADD "order" SERIAL NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note_entity" DROP COLUMN "order"`);
    }

}
