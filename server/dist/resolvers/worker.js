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
exports.WorkerResolver = exports.WorkerRegisterInput = void 0;
require("reflect-metadata");
const user_1 = require("../entities/user");
const worker_1 = require("../entities/worker");
const type_graphql_1 = require("type-graphql");
const user_2 = require("./user");
const validateWorkerRegister_1 = require("../utils/validateWorkerRegister");
let WorkerResponse = class WorkerResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [user_2.ErrorField], {
        nullable: true,
    }),
    __metadata("design:type", Array)
], WorkerResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => worker_1.Worker, {
        nullable: true,
    }),
    __metadata("design:type", worker_1.Worker)
], WorkerResponse.prototype, "worker", void 0);
WorkerResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], WorkerResponse);
let WorkerRegisterInput = class WorkerRegisterInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], WorkerRegisterInput.prototype, "phone", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], WorkerRegisterInput.prototype, "city", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], WorkerRegisterInput.prototype, "sexe", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], WorkerRegisterInput.prototype, "dateOfBirth", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], WorkerRegisterInput.prototype, "description", void 0);
WorkerRegisterInput = __decorate([
    (0, type_graphql_1.InputType)()
], WorkerRegisterInput);
exports.WorkerRegisterInput = WorkerRegisterInput;
let WorkerResolver = class WorkerResolver {
    async age(parent) {
        const age = new Date().getFullYear() - parent.dateOfBirth.getFullYear();
        return age;
    }
    async fullName(parent) {
        const fullName = `${parent.firstName} ${parent.lastName}`;
        return fullName;
    }
    async email(parent, { req }) {
        if (req.session.userId) {
            return parent.email;
        }
        else {
            return "";
        }
    }
    async workerById(id) {
        const worker = await worker_1.Worker.findOne({
            where: {
                id: id,
            },
        });
        if (!worker) {
            return null;
        }
        return worker;
    }
    async workerByUsername(username) {
        const worker = await worker_1.Worker.findOne({
            where: {
                userName: username,
            },
        });
        if (!worker) {
            return null;
        }
        return worker;
    }
    async isWorker(userId, { req }) {
        if (userId) {
            const user = await user_1.User.findOne({ id: userId });
            if (user === null || user === void 0 ? void 0 : user.isWorker) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            const user = await user_1.User.findOne({
                id: req.session.userId,
            });
            if (user.isWorker) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    async registerWorker(options, { req }) {
        if (!req.session.userId) {
            throw new Error("Not authenticated");
        }
        const user = await user_1.User.findOne({
            id: req.session.userId,
        });
        const errors = (0, validateWorkerRegister_1.validateWorkerRegister)(options);
        if (errors) {
            return { errors };
        }
        if (!user) {
            throw new Error("not authenticated");
        }
        if (!user.confirmed) {
            throw new Error("Confirm email first");
        }
        user.isWorker = true;
        await user_1.User.save(user);
        let profilePicture = "";
        if (user.profilePicture != null) {
            profilePicture = user.profilePicture;
        }
        const worker = worker_1.Worker.create({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            email: user.email,
            password: user.password,
            phone: options.phone,
            city: options.city,
            sexe: options.sexe,
            dateOfBirth: options.dateOfBirth,
            description: options.description,
            profilePicture: profilePicture,
        });
        await worker_1.Worker.save(worker);
        return {
            worker,
        };
    }
    async updateWorker(options, { req }) {
        if (!req.session.userId) {
            throw new Error("Not authenticated");
        }
        const worker = await worker_1.Worker.findOne({
            id: req.session.userId,
        });
        const errors = (0, validateWorkerRegister_1.validateWorkerRegister)(options);
        if (errors) {
            return { errors };
        }
        if (!worker) {
            throw new Error("not authenticated");
        }
        worker.phone = options.phone;
        worker.city = options.city;
        worker.sexe = options.sexe;
        worker.dateOfBirth = options.dateOfBirth;
        worker.description = options.description;
        await worker_1.Worker.save(worker);
        return {
            worker,
        };
    }
    async workers() {
        return await worker_1.Worker.find({});
    }
};
__decorate([
    (0, type_graphql_1.FieldResolver)(),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [worker_1.Worker]),
    __metadata("design:returntype", Promise)
], WorkerResolver.prototype, "age", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [worker_1.Worker]),
    __metadata("design:returntype", Promise)
], WorkerResolver.prototype, "fullName", null);
__decorate([
    (0, type_graphql_1.FieldResolver)(),
    __param(0, (0, type_graphql_1.Root)()),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [worker_1.Worker, Object]),
    __metadata("design:returntype", Promise)
], WorkerResolver.prototype, "email", null);
__decorate([
    (0, type_graphql_1.Query)(() => worker_1.Worker, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkerResolver.prototype, "workerById", null);
__decorate([
    (0, type_graphql_1.Query)(() => worker_1.Worker, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("username")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkerResolver.prototype, "workerByUsername", null);
__decorate([
    (0, type_graphql_1.Query)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("userId")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WorkerResolver.prototype, "isWorker", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => WorkerResponse),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WorkerRegisterInput, Object]),
    __metadata("design:returntype", Promise)
], WorkerResolver.prototype, "registerWorker", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => WorkerResponse),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WorkerRegisterInput, Object]),
    __metadata("design:returntype", Promise)
], WorkerResolver.prototype, "updateWorker", null);
__decorate([
    (0, type_graphql_1.Query)(() => [worker_1.Worker]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WorkerResolver.prototype, "workers", null);
WorkerResolver = __decorate([
    (0, type_graphql_1.Resolver)(worker_1.Worker)
], WorkerResolver);
exports.WorkerResolver = WorkerResolver;
//# sourceMappingURL=worker.js.map