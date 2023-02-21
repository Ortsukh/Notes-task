import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1676991645431 implements MigrationInterface {
    name = 'migration1676991645431'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "note_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text, "updatedDate" TIMESTAMP NOT NULL DEFAULT now(), "tags" character varying NOT NULL, "color" character varying NOT NULL, CONSTRAINT "PK_664c6fdaf79389734ae737f7d27" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "note_entity"`);
    }

}
