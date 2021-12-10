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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentResolver = void 0;
const type_graphql_1 = require("type-graphql");
const worker_1 = require("../entities/worker");
const user_1 = require("../entities/user");
const comment_1 = require("../entities/comment");
const skill_1 = require("../entities/skill");
const typeorm_1 = require("typeorm");
let CommentResolver = class CommentResolver {
    async comment(skillId, content, { req }) {
        const user = await user_1.User.findOne({ id: req.session.userId });
        if (!user) {
            return false;
        }
        const skill = await skill_1.Skill.findOne({ id: skillId });
        if (!skill) {
            return false;
        }
        const worker = await worker_1.Worker.findOne({
            id: skill.workerId,
        });
        if (!worker) {
            return false;
        }
        if (!content || content == "") {
            return false;
        }
        if (worker.id == user.id) {
            return false;
        }
        const com = await comment_1.Comment.findOne({
            where: { userId: req.session.userId, skillId: skillId },
        });
        if (!com) {
            const comment = comment_1.Comment.create({
                userId: user.id,
                author: user.userName,
                worker: worker.userName,
                workerId: worker.id,
                skillId: skillId,
                content: content,
            });
            await comment_1.Comment.insert(comment);
            return true;
        }
        else {
            com.content = content;
            await comment_1.Comment.save(com);
            return true;
        }
    }
    async commentsBySkill(title, worker, limit, skip) {
        const comments = await (0, typeorm_1.getConnection)().query(`
    select "c"."id","c"."content","c"."skillId","c"."userId","c"."author","c"."workerId","c"."worker" ,"c"."createdAt","c"."updatedAt" from comment as c
    left join "skill" as s on s.id::text = c."skillId"::text
	  where s."title"::text = '${title.replace(/_/g, " ")}' AND  s."worker"::text = '${worker}'
    order by "c"."updatedAt" DESC,"c"."id" DESC 
    LIMIT ${limit} OFFSET ${skip}
     `);
        return comments;
    }
    async commentsByWorker(worker, limit, skip) {
        const comments = await (0, typeorm_1.getConnection)().query(`
    select "c"."id","c"."content","c"."skillId","c"."userId","c"."author","c"."workerId","c"."worker" ,"c"."createdAt","c"."updatedAt" from comment as c
    left join "worker" as w on w."id"::text = c."workerId"::text
	  where w."userName"::text = '${worker}' 
    order by "c"."updatedAt" DESC,"c"."id" DESC
    LIMIT ${limit} OFFSET ${skip}
     `);
        return comments;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("skillId", () => String)),
    __param(1, (0, type_graphql_1.Arg)("content", () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "comment", null);
__decorate([
    (0, type_graphql_1.Query)(() => [comment_1.Comment]),
    __param(0, (0, type_graphql_1.Arg)("title", () => String)),
    __param(1, (0, type_graphql_1.Arg)("worker", () => String)),
    __param(2, (0, type_graphql_1.Arg)("limit", () => type_graphql_1.Int)),
    __param(3, (0, type_graphql_1.Arg)("skip", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "commentsBySkill", null);
__decorate([
    (0, type_graphql_1.Query)(() => [comment_1.Comment]),
    __param(0, (0, type_graphql_1.Arg)("worker", () => String)),
    __param(1, (0, type_graphql_1.Arg)("limit", () => type_graphql_1.Int)),
    __param(2, (0, type_graphql_1.Arg)("skip", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CommentResolver.prototype, "commentsByWorker", null);
CommentResolver = __decorate([
    (0, type_graphql_1.Resolver)(comment_1.Comment)
], CommentResolver);
exports.CommentResolver = CommentResolver;
//# sourceMappingURL=comment.js.map