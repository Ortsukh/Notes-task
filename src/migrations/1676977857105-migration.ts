import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1676977857105 implements MigrationInterface {
    name = 'migration1676977857105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note_entity" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "note_entity" ADD "tags" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note_entity" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "note_entity" ADD "tags" character varying NOT NULL`);
    }

}
