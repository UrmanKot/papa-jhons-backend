import {MigrationInterface, QueryRunner} from "typeorm";

export class addProduct1655332645536 implements MigrationInterface {
    name = 'addProduct1655332645536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."products_category_enum" AS ENUM('PIZZA', 'SNACKS', 'DRINKS', 'SAUCES', 'DESSERT', 'HOT', 'COMBOBOX', 'VEGAN')`);
        await queryRunner.query(`CREATE TABLE "products" ("idNumber" SERIAL NOT NULL, "id" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying, "category" "public"."products_category_enum" NOT NULL DEFAULT 'PIZZA', "price" integer NOT NULL, "salePrice" integer, "count" integer, "isAddNutritionalValue" boolean NOT NULL DEFAULT false, "proteins" integer, "greases" integer, "carbs" integer, "energyValue" integer, "weight" integer, CONSTRAINT "PK_990d8592736ae3d1709167bef62" PRIMARY KEY ("idNumber"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TYPE "public"."products_category_enum"`);
    }

}
