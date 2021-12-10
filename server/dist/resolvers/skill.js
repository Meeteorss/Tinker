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
exports.SkillResolver = exports.UpdateSkillInput = exports.CreateSkillS3Input = exports.CreateSkillS2Input = exports.CreateSkillS1Input = void 0;
const skill_1 = require("../entities/skill");
const type_graphql_1 = require("type-graphql");
const worker_1 = require("../entities/worker");
const user_1 = require("./user");
const validateInput_1 = require("../utils/validateInput");
const typeorm_1 = require("typeorm");
let CreateSkillResponse = class CreateSkillResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [user_1.ErrorField], {
        nullable: true,
    }),
    __metadata("design:type", Array)
], CreateSkillResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => skill_1.Skill, {
        nullable: true,
    }),
    __metadata("design:type", skill_1.Skill)
], CreateSkillResponse.prototype, "skill", void 0);
CreateSkillResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], CreateSkillResponse);
let CreateSkillS1Input = class CreateSkillS1Input {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateSkillS1Input.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateSkillS1Input.prototype, "zone", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateSkillS1Input.prototype, "title", void 0);
CreateSkillS1Input = __decorate([
    (0, type_graphql_1.InputType)()
], CreateSkillS1Input);
exports.CreateSkillS1Input = CreateSkillS1Input;
let CreateSkillS2Input = class CreateSkillS2Input {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateSkillS2Input.prototype, "description", void 0);
CreateSkillS2Input = __decorate([
    (0, type_graphql_1.InputType)()
], CreateSkillS2Input);
exports.CreateSkillS2Input = CreateSkillS2Input;
let CreateSkillS3Input = class CreateSkillS3Input {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateSkillS3Input.prototype, "pricing", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateSkillS3Input.prototype, "duration", void 0);
CreateSkillS3Input = __decorate([
    (0, type_graphql_1.InputType)()
], CreateSkillS3Input);
exports.CreateSkillS3Input = CreateSkillS3Input;
let UpdateSkillInput = class UpdateSkillInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateSkillInput.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateSkillInput.prototype, "zone", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateSkillInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateSkillInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateSkillInput.prototype, "pricing", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], UpdateSkillInput.prototype, "duration", void 0);
UpdateSkillInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateSkillInput);
exports.UpdateSkillInput = UpdateSkillInput;
let SkillResolver = class SkillResolver {
    async createSkillS1(options, { req }) {
        if (!req.session.userId) {
            throw new Error("Not authenticated");
        }
        const errors = (0, validateInput_1.validateSkillCreationS1)(options);
        if (errors) {
            return { errors };
        }
        const worker = await worker_1.Worker.findOne({ id: req.session.userId });
        if (!worker) {
            throw new Error("Regular users cannot create skills");
        }
        const skill = await skill_1.Skill.create({
            workerId: req.session.userId,
            category: options.category,
            title: options.title,
            zone: options.zone,
            rating: worker.rating,
            ratingsNumber: worker.ratingsNumber,
            worker: worker.userName,
            workerPicUrl: worker.profilePicture,
            status: "Pending",
            pictures: ["", "", "", ""],
        });
        await skill_1.Skill.save(skill);
        if (!worker.skillsIds) {
            worker.skillsIds = [skill.id];
        }
        else {
            worker.skillsIds.push(skill.id);
        }
        await worker_1.Worker.save(worker);
        return {
            skill,
        };
    }
    async createSkillS2(options, skillId, { req }) {
        if (!req.session.userId) {
            throw new Error("Not authenticated");
        }
        const errors = (0, validateInput_1.validateSkillCreationS2)(options);
        if (errors) {
            return { errors };
        }
        const skill = await skill_1.Skill.findOne({ id: skillId });
        if (!skill) {
            throw new Error("This skill does'nt exist");
        }
        if (skill.workerId != req.session.userId) {
            throw new Error("You don't have access to this skill");
        }
        const worker = await worker_1.Worker.findOne({ id: req.session.userId });
        if (!worker) {
            throw new Error("Not authenticated");
        }
        skill.description = options.description;
        await skill_1.Skill.save(skill);
        return {
            skill,
        };
    }
    async createSkillS3(options, skillId, { req }) {
        if (!req.session.userId) {
            throw new Error("Not authenticated");
        }
        const errors = (0, validateInput_1.validateSkillCreationS3)(options);
        if (errors) {
            return { errors };
        }
        const skill = await skill_1.Skill.findOne({ id: skillId });
        if (!skill) {
            throw new Error("This skill does'nt exist");
        }
        if (skill.workerId != req.session.userId) {
            throw new Error("You don't have access to this skill");
        }
        const worker = await worker_1.Worker.findOne({ id: req.session.userId });
        if (!worker) {
            throw new Error("Not authenticated");
        }
        skill.duration = options.duration;
        skill.pricing = parseInt(options.pricing);
        skill.status = "Finished";
        await skill_1.Skill.save(skill);
        return {
            skill,
        };
    }
    async updateSkill(options, skillId, { req }) {
        const worker = await worker_1.Worker.findOne({ id: req.session.userId });
        if (!req.session.userId || req.session.userId != (worker === null || worker === void 0 ? void 0 : worker.id)) {
            throw new Error("Not authenticated");
        }
        const errors = (0, validateInput_1.validateSkillUpdate)(options);
        if (errors) {
            return { errors };
        }
        const skill = await skill_1.Skill.findOne({ id: skillId });
        if (!skill) {
            throw new Error("no skill found");
        }
        skill.category = options.category;
        skill.title = options.title;
        skill.description = options.description;
        skill.pricing = parseInt(options.pricing);
        skill.duration = options.duration;
        skill.zone = options.zone;
        skill.status = "Finished";
        await skill_1.Skill.save(skill);
        return {
            skill,
        };
    }
    async deleteSkill(skillId, { req }) {
        const worker = await worker_1.Worker.findOne({ id: req.session.userId });
        const skill = await skill_1.Skill.findOne({ id: skillId });
        if (!req.session.userId || req.session.userId != (worker === null || worker === void 0 ? void 0 : worker.id)) {
            throw new Error("Not authenticated");
        }
        if (!skill) {
            return false;
        }
        worker.skillsIds.forEach((skillId, idx) => {
            if (skillId == skill.id) {
                worker.skillsIds.splice(idx, 1);
            }
        });
        await worker_1.Worker.save(worker);
        await skill_1.Skill.delete({ id: skillId });
        return true;
    }
    async getSkills(workerId, { req }) {
        const skills = await skill_1.Skill.find({ where: { workerId: workerId } });
        if (!skills) {
            return [];
        }
        return skills;
    }
    async getSkill(skillId) {
        const skill = await skill_1.Skill.findOne({ id: skillId });
        if (!skill) {
            return null;
        }
        return skill;
    }
    async getSkillByTitle(title, workerId) {
        const skill = await skill_1.Skill.findOne({
            where: { title: title.replace(/_/g, " "), workerId: workerId },
        });
        if (!skill) {
            return null;
        }
        return skill;
    }
    async getSkillCount() {
        const count = await skill_1.Skill.find({});
        return count;
    }
    async searchSkills(category, city, keyword, orderBy, limit, skip) {
        let whereClause = "WHERE ";
        let orderClause = "ORDER BY ";
        const validCriterias = [
            { type: "keyword", value: keyword },
            { type: "category", value: category },
            { type: "zone", value: city },
        ].filter((e) => {
            return !(e.value == "");
        });
        let replacements = [];
        if (validCriterias.length == 1) {
            if (validCriterias[0].type == "keyword") {
                whereClause += `("description" LIKE $1  OR "title" LIKE $1 )`;
                replacements.push(`%${validCriterias[0].value}%`);
            }
            else {
                whereClause += `"${validCriterias[0].type}" = $1`;
                replacements.push(validCriterias[0].value);
            }
        }
        else if (validCriterias.length > 1) {
            if (validCriterias[0].type == "keyword") {
                whereClause += `("description" LIKE $1  OR "title" LIKE $1 )`;
                replacements.push(`%${validCriterias[0].value}%`);
                for (let i = 1; i < validCriterias.length; i++) {
                    whereClause += ` AND "${validCriterias[i].type}" = $${i + 1} `;
                    replacements.push(validCriterias[i].value);
                }
            }
            else {
                whereClause += `"${validCriterias[0].type}" = $1`;
                replacements.push(validCriterias[0].value);
                for (let i = 1; i < validCriterias.length; i++) {
                    whereClause += ` AND "${validCriterias[i].type}" = $${i + 1} `;
                    replacements.push(validCriterias[i].value);
                }
            }
        }
        whereClause += ` AND "status" = 'Finished'`;
        if (orderBy == "rating") {
            orderClause += `"rating" DESC`;
        }
        else if (orderBy == "delivery time") {
            orderClause += `"duration" ASC`;
        }
        else if (orderBy == "pricing") {
            orderClause += `"pricing" ASC`;
        }
        const query = `
    SELECT * from public.skill
    ${whereClause}
    ${orderClause}
  `;
        const skills = await (0, typeorm_1.getConnection)().query(query, replacements);
        skills.forEach((skill) => {
            skill.pictures = skill.pictures.split(",");
        });
        return skills;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => CreateSkillResponse),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateSkillS1Input, Object]),
    __metadata("design:returntype", Promise)
], SkillResolver.prototype, "createSkillS1", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => CreateSkillResponse),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __param(1, (0, type_graphql_1.Arg)("skillId", () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateSkillS2Input, String, Object]),
    __metadata("design:returntype", Promise)
], SkillResolver.prototype, "createSkillS2", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => CreateSkillResponse),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __param(1, (0, type_graphql_1.Arg)("skillId", () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateSkillS3Input, String, Object]),
    __metadata("design:returntype", Promise)
], SkillResolver.prototype, "createSkillS3", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => CreateSkillResponse),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __param(1, (0, type_graphql_1.Arg)("skillId", () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateSkillInput, String, Object]),
    __metadata("design:returntype", Promise)
], SkillResolver.prototype, "updateSkill", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("skillId", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SkillResolver.prototype, "deleteSkill", null);
__decorate([
    (0, type_graphql_1.Query)(() => [skill_1.Skill]),
    __param(0, (0, type_graphql_1.Arg)("workerId", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SkillResolver.prototype, "getSkills", null);
__decorate([
    (0, type_graphql_1.Query)(() => skill_1.Skill || null),
    __param(0, (0, type_graphql_1.Arg)("skillId", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SkillResolver.prototype, "getSkill", null);
__decorate([
    (0, type_graphql_1.Query)(() => skill_1.Skill, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("title", () => String)),
    __param(1, (0, type_graphql_1.Arg)("workerId", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SkillResolver.prototype, "getSkillByTitle", null);
__decorate([
    (0, type_graphql_1.Query)(() => [skill_1.Skill]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SkillResolver.prototype, "getSkillCount", null);
__decorate([
    (0, type_graphql_1.Query)(() => [skill_1.Skill]),
    __param(0, (0, type_graphql_1.Arg)("category", () => String)),
    __param(1, (0, type_graphql_1.Arg)("city", () => String)),
    __param(2, (0, type_graphql_1.Arg)("keyword", () => String)),
    __param(3, (0, type_graphql_1.Arg)("orderBy", () => String)),
    __param(4, (0, type_graphql_1.Arg)("limit", () => type_graphql_1.Int)),
    __param(5, (0, type_graphql_1.Arg)("skip", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], SkillResolver.prototype, "searchSkills", null);
SkillResolver = __decorate([
    (0, type_graphql_1.Resolver)(skill_1.Skill)
], SkillResolver);
exports.SkillResolver = SkillResolver;
//# sourceMappingURL=skill.js.map