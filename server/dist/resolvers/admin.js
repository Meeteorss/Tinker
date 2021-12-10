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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminResolver = void 0;
require("reflect-metadata");
const user_1 = require("../entities/user");
const worker_1 = require("../entities/worker");
const type_graphql_1 = require("type-graphql");
const argon2_1 = __importDefault(require("argon2"));
const constants_1 = require("../constants");
const validateRegister_1 = require("../utils/validateRegister");
const admin_1 = require("../entities/admin");
const skill_1 = require("../entities/skill");
const user_2 = require("./user");
let RegisterAdminResponse = class RegisterAdminResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [user_2.ErrorField], {
        nullable: true,
    }),
    __metadata("design:type", Array)
], RegisterAdminResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => admin_1.Admin, {
        nullable: true,
    }),
    __metadata("design:type", admin_1.Admin)
], RegisterAdminResponse.prototype, "admin", void 0);
RegisterAdminResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], RegisterAdminResponse);
let AdminRegisterInput = class AdminRegisterInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AdminRegisterInput.prototype, "firstName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AdminRegisterInput.prototype, "lastName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AdminRegisterInput.prototype, "userName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AdminRegisterInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AdminRegisterInput.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AdminRegisterInput.prototype, "confirmedPassword", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AdminRegisterInput.prototype, "role", void 0);
AdminRegisterInput = __decorate([
    (0, type_graphql_1.InputType)()
], AdminRegisterInput);
let AdminLoginInput = class AdminLoginInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AdminLoginInput.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AdminLoginInput.prototype, "password", void 0);
AdminLoginInput = __decorate([
    (0, type_graphql_1.InputType)()
], AdminLoginInput);
let AdminResolver = class AdminResolver {
    async getCurrentAdmin({ req }) {
        if (!req.session.userId) {
            return null;
        }
        const admin = await admin_1.Admin.findOne({
            id: req.session.userId,
        });
        return admin;
    }
    async addAdmin(options, { req }) {
        if (!req.session.userId) {
            return {
                errors: [
                    {
                        field: "firstName",
                        message: "Log in as a super-admin first",
                    },
                ],
            };
        }
        const superAdmin = await admin_1.Admin.findOne({
            where: { id: req.session.userId },
        });
        if (!superAdmin || superAdmin.role != "SUPER_ADMIN") {
            return {
                errors: [
                    {
                        field: "firstName",
                        message: "Not authorized",
                    },
                ],
            };
        }
        const errors = (0, validateRegister_1.validateRegister)(options);
        if (errors) {
            return { errors };
        }
        const hashedPassword = await argon2_1.default.hash(options.password);
        const admin = admin_1.Admin.create({
            firstName: options.firstName,
            lastName: options.lastName,
            username: options.userName,
            email: options.email,
            password: hashedPassword,
            role: "ADMIN",
        });
        try {
            await admin_1.Admin.save(admin);
        }
        catch (err) {
            if (err.detail.includes("already exists") &&
                err.detail.includes("email")) {
                return {
                    errors: [
                        {
                            field: "email",
                            message: "Email already used",
                        },
                    ],
                };
            }
            if (err.detail.includes("already exists") &&
                err.detail.includes("userName")) {
                return {
                    errors: [
                        {
                            field: "userName",
                            message: "username already used",
                        },
                    ],
                };
            }
        }
        req.session.userId = admin.id;
        return {
            admin,
        };
    }
    async deleteAdmin(username, { req }) {
        if (!req.session.userId) {
            throw new Error("Log in as a super-admin first");
        }
        const superAdmin = await admin_1.Admin.findOne({
            where: { id: req.session.userId, role: "SUPER_ADMIN" },
        });
        if (!superAdmin) {
            throw new Error("Not authorized");
        }
        const admin = await admin_1.Admin.findOne({ username: username });
        if (!admin) {
            throw new Error("No admin with this username found");
        }
        await admin_1.Admin.delete({ username: username });
    }
    async deleteUserProfilePic(userId, { req }) {
        if (!req.session.userId) {
            throw new Error("Not authenticated");
        }
        const admin = await admin_1.Admin.findOne({ id: req.session.userId });
        if (!admin) {
            throw new Error("Admin required");
        }
        const user = await user_1.User.findOne({ id: userId });
        if (!user) {
            throw new Error("User does not exist");
        }
        if (user.isWorker) {
            await worker_1.Worker.update({ id: userId }, { profilePicture: "" });
            await skill_1.Skill.update({ workerId: userId }, { workerPicUrl: "" });
        }
        await user_1.User.update({ id: userId }, { profilePicture: "" });
    }
    async deleteSkillPics(skillId, { req }) {
        if (!req.session.userId) {
            throw new Error("Not authenticated");
        }
        const admin = await admin_1.Admin.findOne({ id: req.session.userId });
        if (!admin) {
            throw new Error("Admin required");
        }
        const skill = await skill_1.Skill.findOne({ id: skillId });
        if (!skill) {
            throw new Error("Skill does not exist");
        }
        await skill_1.Skill.update({ id: skillId }, { pictures: ["", "", "", ""] });
        return true;
    }
    async hideSkill(skillId, { req }) {
        if (!req.session.userId) {
            throw new Error("Not authenticated");
        }
        const admin = await admin_1.Admin.findOne({ id: req.session.userId });
        if (!admin) {
            throw new Error("Admin required");
        }
        const skill = await skill_1.Skill.findOne({ id: skillId });
        if (!skill) {
            throw new Error("Skill does not exist");
        }
        await skill_1.Skill.update({ id: skillId }, { status: "Hidden" });
        return true;
    }
    async getAllUsers({ req }) {
        if (!req.session.userId) {
            throw new Error("Not authenticated");
        }
        const admin = await admin_1.Admin.findOne({ id: req.session.userId });
        if (!admin) {
            throw new Error("Admin required");
        }
        const users = await user_1.User.find({});
        return users;
    }
    async getAllWorkers({ req }) {
        if (!req.session.userId) {
            throw new Error("Not authenticated");
        }
        const admin = await admin_1.Admin.findOne({ id: req.session.userId });
        if (!admin) {
            throw new Error("Admin required");
        }
        const workers = await worker_1.Worker.find({});
        return workers;
    }
    async getAllSkills({ req }) {
        if (!req.session.userId) {
            throw new Error("Not authenticated");
        }
        const admin = await admin_1.Admin.findOne({ id: req.session.userId });
        if (!admin) {
            throw new Error("Admin required");
        }
        const skills = await skill_1.Skill.find({});
        return skills;
    }
    async adminLogin(options, { req }) {
        const admin = await admin_1.Admin.findOne({
            where: [{ username: options.username }],
        });
        if (!admin) {
            return {
                errors: [
                    {
                        field: "username",
                        message: "admin doesn't exist",
                    },
                ],
            };
        }
        const validPassword = await argon2_1.default.verify(admin.password, options.password);
        if (!validPassword) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "Password incorrect",
                    },
                ],
            };
        }
        req.session.userId = admin.id;
        return {
            admin: admin,
        };
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
};
__decorate([
    (0, type_graphql_1.Query)(() => admin_1.Admin, {
        nullable: true,
    }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "getCurrentAdmin", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => RegisterAdminResponse),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AdminRegisterInput, Object]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "addAdmin", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("username")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "deleteAdmin", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("userId")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "deleteUserProfilePic", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("skillId")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "deleteSkillPics", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("skillId")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "hideSkill", null);
__decorate([
    (0, type_graphql_1.Query)(() => [user_1.User]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "getAllUsers", null);
__decorate([
    (0, type_graphql_1.Query)(() => [worker_1.Worker]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "getAllWorkers", null);
__decorate([
    (0, type_graphql_1.Query)(() => [skill_1.Skill]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "getAllSkills", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => RegisterAdminResponse),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AdminLoginInput, Object]),
    __metadata("design:returntype", Promise)
], AdminResolver.prototype, "adminLogin", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminResolver.prototype, "logout", null);
AdminResolver = __decorate([
    (0, type_graphql_1.Resolver)(user_1.User)
], AdminResolver);
exports.AdminResolver = AdminResolver;
//# sourceMappingURL=admin.js.map