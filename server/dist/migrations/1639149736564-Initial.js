"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Initial1639149736564 = void 0;
class Initial1639149736564 {
    constructor() {
        this.name = 'Initial1639149736564';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "admin" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "profilePicture" character varying DEFAULT '', "role" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_5e568e001f9d1b91f67815c580f" UNIQUE ("username"), CONSTRAINT "UQ_de87485f6489f5d0995f5841952" UNIQUE ("email"), CONSTRAINT "PK_e032310bcef831fb83101899b10" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "chat" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "senderId" character varying NOT NULL, "recieverId" character varying NOT NULL, "message" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, "userId" character varying NOT NULL, "skillId" character varying NOT NULL, "author" character varying NOT NULL, "workerId" character varying NOT NULL, "worker" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "favorite" ("userId" character varying NOT NULL, "workerId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bd98ec443879a330a96cff7ab59" PRIMARY KEY ("userId", "workerId"))`);
            yield queryRunner.query(`CREATE TABLE "like" ("userId" character varying NOT NULL, "skillId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ef49b885fe71f882f936a912713" PRIMARY KEY ("userId", "skillId"))`);
            yield queryRunner.query(`CREATE TYPE "message_state_enum" AS ENUM('sender', 'reciever', 'both', 'none')`);
            yield queryRunner.query(`CREATE TABLE "message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "senderId" character varying NOT NULL, "recieverId" character varying NOT NULL, "sender" character varying NOT NULL, "reciever" character varying NOT NULL, "content" character varying NOT NULL, "state" "message_state_enum" NOT NULL DEFAULT 'none', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "userName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "profilePicture" character varying DEFAULT '', "isWorker" boolean NOT NULL DEFAULT false, "confirmed" boolean NOT NULL DEFAULT false, "likesIds" text, "favoritesIds" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "skill" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "workerId" character varying NOT NULL, "worker" character varying, "rating" integer NOT NULL, "ratingsNumber" integer, "workerPicUrl" character varying, "category" character varying, "title" character varying, "description" character varying, "pricing" integer, "duration" integer NOT NULL DEFAULT '768', "zone" character varying, "status" character varying NOT NULL, "pictures" text, "likesCount" integer DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "worker" ("id" uuid NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "userName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "sexe" character varying NOT NULL, "phone" character varying NOT NULL, "city" character varying NOT NULL, "dateOfBirth" TIMESTAMP NOT NULL, "description" character varying NOT NULL, "skillsIds" text, "favsCount" integer, "isActive" boolean NOT NULL DEFAULT true, "ratingsValue" integer NOT NULL DEFAULT '0', "ratingsNumber" integer NOT NULL DEFAULT '0', "rating" double precision NOT NULL DEFAULT '0', "profilePicture" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_13679fa10b68bb29e4303ca1c91" UNIQUE ("email"), CONSTRAINT "PK_dc8175fa0e34ce7a39e4ec73b94" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "rating" ("value" integer NOT NULL, "userId" uuid NOT NULL, "workerId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_43d8f3ac1d129a7fc4c1f14b39b" PRIMARY KEY ("userId", "workerId"))`);
            yield queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "rating" ADD CONSTRAINT "FK_cb17b84ff48ac6dac4f59e265bf" FOREIGN KEY ("workerId") REFERENCES "worker"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_cb17b84ff48ac6dac4f59e265bf"`);
            yield queryRunner.query(`ALTER TABLE "rating" DROP CONSTRAINT "FK_a6c53dfc89ba3188b389ef29a62"`);
            yield queryRunner.query(`DROP TABLE "rating"`);
            yield queryRunner.query(`DROP TABLE "worker"`);
            yield queryRunner.query(`DROP TABLE "skill"`);
            yield queryRunner.query(`DROP TABLE "user"`);
            yield queryRunner.query(`DROP TABLE "message"`);
            yield queryRunner.query(`DROP TYPE "message_state_enum"`);
            yield queryRunner.query(`DROP TABLE "like"`);
            yield queryRunner.query(`DROP TABLE "favorite"`);
            yield queryRunner.query(`DROP TABLE "comment"`);
            yield queryRunner.query(`DROP TABLE "chat"`);
            yield queryRunner.query(`DROP TABLE "admin"`);
        });
    }
}
exports.Initial1639149736564 = Initial1639149736564;
//# sourceMappingURL=1639149736564-Initial.js.map