import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1581271667898 implements MigrationInterface {
    name = 'initial1581271667898'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "member" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "name" character varying NOT NULL, "slug" character varying NOT NULL, "birthdate" date, CONSTRAINT "UQ_9472525deb6aeceb6265c2439a4" UNIQUE ("slug"), CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "member"`, undefined);
    }

}
