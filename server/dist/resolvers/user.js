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
exports.UserResolver = exports.LoginInput = exports.RegisterInput = exports.ErrorField = void 0;
require("reflect-metadata");
const user_1 = require("../entities/user");
const worker_1 = require("../entities/worker");
const type_graphql_1 = require("type-graphql");
const argon2_1 = __importDefault(require("argon2"));
const constants_1 = require("../constants");
const validateRegister_1 = require("../utils/validateRegister");
const nodemailer_1 = require("../utils/nodemailer");
const uuid_1 = require("uuid");
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
let UserResponse = class UserResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [ErrorField], {
        nullable: true,
    }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => user_1.User, {
        nullable: true,
    }),
    __metadata("design:type", user_1.User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserResponse);
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
    async register(options, { req }) {
        const errors = (0, validateRegister_1.validateRegister)(options);
        if (errors) {
            return { errors };
        }
        const hashedPassword = await argon2_1.default.hash(options.password);
        const user = user_1.User.create({
            firstName: options.firstName,
            lastName: options.lastName,
            userName: options.userName,
            email: options.email,
            password: hashedPassword,
        });
        try {
            await user_1.User.save(user);
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
        await (0, nodemailer_1.sendConfirmationEmail)(user.email, await (0, nodemailer_1.createConfirmationUrl)(user.id));
        req.session.userId = user.id;
        return {
            user,
        };
    }
    async sendConfirmationEmail({ req }) {
        if (!req.session.userId) {
            throw new Error("Not authenticated");
        }
        const user = await user_1.User.findOne({ id: req.session.userId });
        if (!user) {
            throw new Error("User does not exist");
        }
        await (0, nodemailer_1.sendConfirmationEmail)(user.email, await (0, nodemailer_1.createConfirmationUrl)(user.id));
        return true;
    }
    async login(options, { req }) {
        const user = await user_1.User.findOne({
            email: options.email,
        });
        if (!user) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "Identifiants incorrectes.",
                    },
                ],
            };
        }
        const validPassword = await argon2_1.default.verify(user.password, options.password);
        if (!validPassword) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "Identifiants incorrectes.",
                    },
                ],
            };
        }
        req.session.userId = user.id;
        return {
            user: user,
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
    async confirmUser(token, { redis }) {
        const userId = await redis.get(token);
        if (!userId) {
            return false;
        }
        await user_1.User.update({ id: userId }, { confirmed: true });
        await redis.del(token);
        return true;
    }
    async changeEmail(email, { req }) {
        const user = await user_1.User.findOne({ id: req.session.userId });
        const worker = await worker_1.Worker.findOne({ id: req.session.userId });
        if (!user || !worker) {
            throw new Error("User not found");
        }
        if (user.email == email) {
            throw new Error("You can't change it to your current email");
        }
        if (!(0, validateRegister_1.validateEmail)(email)) {
            throw new Error("Invalid email");
        }
        else {
            await user_1.User.update({ id: req.session.userId }, { email: email });
            await worker_1.Worker.update({ id: req.session.userId }, { email: email });
            return true;
        }
    }
    async confirmPassword(password, { req }) {
        const user = await user_1.User.findOne({ id: req.session.userId });
        if (!user) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "User not found",
                    },
                ],
            };
        }
        const validPassword = await argon2_1.default.verify(user.password, password);
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
        return user;
    }
    async forgetPassword(email, { redis }) {
        const user = await user_1.User.findOne({ email: email });
        if (!user) {
            return true;
        }
        const token = (0, uuid_1.v4)();
        await redis.set("forgot_password" + token, user.id, "ex", 60 * 60 * 2);
        await (0, nodemailer_1.sendFPEmail)(user.email, token);
        return true;
    }
    async changePassword(token, password, confirmedPassword, { redis, req }) {
        if (password.length <= 2) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "length must be greater than 2",
                    },
                ],
            };
        }
        if (confirmedPassword != password) {
            return {
                errors: [
                    {
                        field: "confirmedPassword",
                        message: "Passwords did not match",
                    },
                ],
            };
        }
        const userId = await redis.get("forgot_password" + token);
        if (!userId) {
            return {
                errors: [
                    {
                        field: "token",
                        message: "Invalid request",
                    },
                ],
            };
        }
        const user = await user_1.User.findOne({ id: userId });
        if (!user) {
            return {
                errors: [
                    {
                        field: "token",
                        message: "User does'nt exist",
                    },
                ],
            };
        }
        const validPassword = await argon2_1.default.verify(user.password, password);
        if (validPassword) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "You should enter a different password than the current one",
                    },
                ],
            };
        }
        const hashedPassword = await argon2_1.default.hash(password);
        await user_1.User.update({ id: userId }, { password: hashedPassword });
        await worker_1.Worker.update({ id: userId }, { password: hashedPassword });
        await redis.del("forgot_password" + token);
        req.session.userId = user.id;
        return { user };
    }
    async changePasswordFromProfil(oldPassword, password, confirmedPassword, { req }) {
        if (password.length <= 2) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "length must be greater than 2",
                    },
                ],
            };
        }
        if (confirmedPassword != password) {
            return {
                errors: [
                    {
                        field: "confirmedPassword",
                        message: "Passwords did not match",
                    },
                ],
            };
        }
        if (!req.session.userId) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "Not authenticated",
                    },
                ],
            };
        }
        const user = await user_1.User.findOne({ id: req.session.userId });
        if (!user) {
            return {
                errors: [
                    {
                        field: "password",
                        message: "User does'nt exist",
                    },
                ],
            };
        }
        const validPassword = await argon2_1.default.verify(user.password, oldPassword);
        if (!validPassword) {
            return {
                errors: [
                    {
                        field: "oldPassword",
                        message: "Incorrect password",
                    },
                ],
            };
        }
        const hashedPassword = await argon2_1.default.hash(password);
        await user_1.User.update({ id: req.session.userId }, { password: hashedPassword });
        await worker_1.Worker.update({ id: req.session.userId }, { password: hashedPassword });
        return { user };
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
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "sendConfirmationEmail", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "logout", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("token")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "confirmUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changeEmail", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)("password", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "confirmPassword", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("email")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "forgetPassword", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)("token", () => String)),
    __param(1, (0, type_graphql_1.Arg)("password", () => String)),
    __param(2, (0, type_graphql_1.Arg)("confirmedPassword", () => String)),
    __param(3, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changePassword", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => UserResponse),
    __param(0, (0, type_graphql_1.Arg)("oldPassword", () => String)),
    __param(1, (0, type_graphql_1.Arg)("password", () => String)),
    __param(2, (0, type_graphql_1.Arg)("confirmedPassword", () => String)),
    __param(3, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changePasswordFromProfil", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(user_1.User)
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=user.js.map