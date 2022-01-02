"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.GlobalResolver = void 0;
const type_graphql_1 = require("type-graphql");
const user_1 = require("../entities/user");
const skill_1 = require("../entities/skill");
const worker_1 = require("../entities/worker");
const typeorm_1 = require("typeorm");
let NavbarResponse = class NavbarResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => user_1.User, {
        nullable: true,
    }),
    __metadata("design:type", user_1.User)
], NavbarResponse.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [skill_1.Skill], {
        nullable: true,
    }),
    __metadata("design:type", Array)
], NavbarResponse.prototype, "likes", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [worker_1.Worker], {
        nullable: true,
    }),
    __metadata("design:type", Array)
], NavbarResponse.prototype, "favs", void 0);
NavbarResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], NavbarResponse);
let SkillPageResponse = class SkillPageResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => skill_1.Skill, { nullable: true }),
    __metadata("design:type", skill_1.Skill)
], SkillPageResponse.prototype, "skill", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => worker_1.Worker, { nullable: true }),
    __metadata("design:type", worker_1.Worker)
], SkillPageResponse.prototype, "worker", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [skill_1.Skill], { nullable: true }),
    __metadata("design:type", Array)
], SkillPageResponse.prototype, "otherSkills", void 0);
SkillPageResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], SkillPageResponse);
let WorkerPageResponse = class WorkerPageResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => worker_1.Worker, { nullable: true }),
    __metadata("design:type", worker_1.Worker)
], WorkerPageResponse.prototype, "worker", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [skill_1.Skill], { nullable: true }),
    __metadata("design:type", Array)
], WorkerPageResponse.prototype, "skills", void 0);
WorkerPageResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], WorkerPageResponse);
let GlobalResolver = class GlobalResolver {
    navbarQuery({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                throw new Error("Not authenticated");
            }
            const user = yield user_1.User.findOne({
                id: req.session.userId,
            });
            if (!user) {
                throw new Error("User does not exist");
            }
            const skills = yield (0, typeorm_1.getConnection)().query(`
    select id,title,worker,pictures from skill
    left join "like" as l on skill.id::text = l."skillId"::text
    where l."userId"::text = '${user.id}'
    `);
            if (!skills) {
                throw new Error("No liked skill found");
            }
            skills.forEach((skill) => {
                skill.pictures = skill.pictures.split(",");
            });
            const workers = yield (0, typeorm_1.getConnection)().query(`
    select id,"userName","profilePicture","rating","ratingsNumber" from worker
    left join "favorite" as f on worker.id::text = f."workerId"::text
	  where f."userId"::text = '${user.id}' 
     `);
            if (!workers) {
                throw new Error("No favorite tinker found");
            }
            return {
                user,
                likes: skills,
                favs: workers,
            };
        });
    }
    skillPageQuery(username, title) {
        return __awaiter(this, void 0, void 0, function* () {
            title = title.replace(/_/g, " ");
            const worker = yield worker_1.Worker.findOne({
                where: {
                    userName: username,
                },
            });
            const skills = yield skill_1.Skill.find({
                where: { worker: username },
            });
            if (!skills || !worker) {
                throw new Error("Skill or worker doesnt exist");
            }
            const skill = skills.find((s) => s.title == title);
            const otherSkills = skills.filter((s) => {
                return !(s == skill);
            });
            return {
                skill,
                worker,
                otherSkills,
            };
        });
    }
    workerPageQuery(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const worker = yield worker_1.Worker.findOne({
                where: {
                    userName: username,
                },
            });
            if (!worker) {
                return null;
            }
            const skills = yield skill_1.Skill.find({
                where: { worker: username, workerId: worker.id },
            });
            if (!skills || !worker) {
                return null;
            }
            return {
                worker,
                skills,
            };
        });
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => NavbarResponse),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GlobalResolver.prototype, "navbarQuery", null);
__decorate([
    (0, type_graphql_1.Query)(() => SkillPageResponse),
    __param(0, (0, type_graphql_1.Arg)("username")),
    __param(1, (0, type_graphql_1.Arg)("title", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], GlobalResolver.prototype, "skillPageQuery", null);
__decorate([
    (0, type_graphql_1.Query)(() => WorkerPageResponse),
    __param(0, (0, type_graphql_1.Arg)("username")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GlobalResolver.prototype, "workerPageQuery", null);
GlobalResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], GlobalResolver);
exports.GlobalResolver = GlobalResolver;
//# sourceMappingURL=global.js.map