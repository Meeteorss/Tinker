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
exports.LikeResolver = void 0;
const type_graphql_1 = require("type-graphql");
const worker_1 = require("../entities/worker");
const user_1 = require("../entities/user");
const skill_1 = require("../entities/skill");
const like_1 = require("../entities/like");
const typeorm_1 = require("typeorm");
let LikeResolver = class LikeResolver {
    like(skillId, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                throw new Error("Not authenticated");
            }
            const user = yield user_1.User.findOne({ id: req.session.userId });
            if (!user) {
                throw new Error("User does not exist");
            }
            if (user.likesIds && user.likesIds.includes(skillId)) {
                throw new Error("Already Liked this skill");
            }
            const skill = yield skill_1.Skill.findOne({ id: skillId });
            if (!skill) {
                throw new Error("No skill found");
            }
            const worker = yield worker_1.Worker.findOne({
                id: skill.workerId,
            });
            if (!worker) {
                throw new Error("This skill has no owner");
            }
            const like = yield like_1.Like.create({
                userId: user.id,
                skillId: skillId,
            });
            if (!user.likesIds) {
                user.likesIds = [like.skillId];
            }
            else {
                user.likesIds.push(like.skillId);
            }
            skill.likesCount++;
            yield (0, typeorm_1.getManager)().transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                yield transactionalEntityManager.save(like);
                yield transactionalEntityManager.save(skill);
                yield transactionalEntityManager.save(user);
            }));
            return true;
        });
    }
    dislike(skillId, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                throw new Error("Not authenticated");
            }
            const user = yield user_1.User.findOne({ id: req.session.userId });
            if (!user) {
                throw new Error("User does not exist");
            }
            if (!user.likesIds || !user.likesIds.includes(skillId)) {
                throw new Error("This skill is not in your liked skills list");
            }
            const skill = yield skill_1.Skill.findOne({ id: skillId });
            if (!skill) {
                throw new Error("Skill does not exist");
            }
            user.likesIds = user.likesIds.filter((id) => {
                return !(id == skillId);
            });
            skill.likesCount--;
            yield (0, typeorm_1.getManager)().transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                yield transactionalEntityManager.delete(like_1.Like, {
                    userId: user.id,
                    skillId: skillId,
                });
                yield transactionalEntityManager.save(skill);
                yield transactionalEntityManager.save(user);
            }));
            return true;
        });
    }
    getLikedSkills({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.User.findOne({ id: req.session.userId });
            if (!user) {
                throw new Error("Not authenticated");
            }
            const skills = yield (0, typeorm_1.getConnection)().query(`
    select id,title,worker,pictures,l."userId" from skill
    left join "like" as l on skill.id::text = l."skillId"::text
    where l."userId"::text = '${user.id}'
     `);
            skills.forEach((skill) => {
                skill.pictures = skill.pictures.split(",");
            });
            const returnedSkills = skills.map((skill) => ({
                skillId: skill.id,
                title: skill.title,
                worker: skill.worker,
            }));
            if (!returnedSkills) {
                throw new Error("No liked skill found");
            }
            if (!skills) {
                throw new Error("No liked skill found");
            }
            return skills;
        });
    }
    getLikesCount(skillId) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield like_1.Like.findAndCount({ where: { skillId: skillId } });
            return count[1];
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("skillId", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LikeResolver.prototype, "like", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("skillId", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LikeResolver.prototype, "dislike", null);
__decorate([
    (0, type_graphql_1.Query)(() => [skill_1.Skill]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LikeResolver.prototype, "getLikedSkills", null);
__decorate([
    (0, type_graphql_1.Query)(() => type_graphql_1.Int),
    __param(0, (0, type_graphql_1.Arg)("skillId", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LikeResolver.prototype, "getLikesCount", null);
LikeResolver = __decorate([
    (0, type_graphql_1.Resolver)(like_1.Like)
], LikeResolver);
exports.LikeResolver = LikeResolver;
//# sourceMappingURL=like.js.map