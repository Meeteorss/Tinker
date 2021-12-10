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
exports.UserResolver = exports.LoginInput = exports.RegisterInput = exports.ErrorField = void 0;
require("reflect-metadata");
const user_1 = require("../entities/user");
const type_graphql_1 = require("type-graphql");
const constants_1 = require("../constants");
const typeorm_1 = require("typeorm");
const skill_1 = require("../entities/skill");
const worker_1 = require("../entities/worker");
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
let ErrorField = class ErrorField {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ErrorField.prototype, "field", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ErrorField.prototype, "message", void 0);
ErrorField = __decorate([
    (0, type_graphql_1.ObjectType)()
], ErrorField);
exports.ErrorField = ErrorField;
let RegisterInput = class RegisterInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "firstName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "lastName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "userName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterInput.prototype, "confirmedPassword", void 0);
RegisterInput = __decorate([
    (0, type_graphql_1.InputType)()
], RegisterInput);
exports.RegisterInput = RegisterInput;
let LoginInput = class LoginInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], LoginInput.prototype, "password", void 0);
LoginInput = __decorate([
    (0, type_graphql_1.InputType)()
], LoginInput);
exports.LoginInput = LoginInput;
let UserResolver = class UserResolver {
    async me({ req }) {
        if (!req.session.userId) {
            return null;
        }
        const user = await user_1.User.findOne({
            id: req.session.userId,
        });
        return user;
    }
    logout({ req, res }) {
        return new Promise((resolve) => req.session.destroy((err) => {
            res.clearCookie(constants_1.COOKIE_NAME);
            if (err) {
                console.log(err);
                resolve(false);
                return;
            }
            resolve(true);
        }));
    }
    async navbarQuery({ req }) {
        if (!req.session.userId) {
            throw new Error("Not authenticated");
        }
        const user = await user_1.User.findOne({
            id: req.session.userId,
        });
        if (!user) {
            throw new Error("User does not exist");
        }
        const skills = await (0, typeorm_1.getConnection)().query(`
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
        const workers = await (0, typeorm_1.getConnection)().query(`
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
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => user_1.User, {
        nullable: true,
    }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "logout", null);
__decorate([
    (0, type_graphql_1.Query)(() => NavbarResponse),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "navbarQuery", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(user_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map