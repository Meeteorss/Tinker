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
exports.WorkerResolver = exports.WorkerRegisterInput = void 0;
require("reflect-metadata");
const user_1 = require("../entities/user");
const worker_1 = require("../entities/worker");
const type_graphql_1 = require("type-graphql");
const argon2_1 = __importDefault(require("argon2"));
const constants_1 = require("../constants");
const user_2 = require("./user");
const typeorm_1 = require("typeorm");
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
], WorkerRegisterInput.prototype, "job", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], WorkerRegisterInput.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], WorkerRegisterInput.prototype, "jobDescription", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], WorkerRegisterInput.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], WorkerRegisterInput.prototype, "duration", void 0);
WorkerRegisterInput = __decorate([
    (0, type_graphql_1.InputType)()
], WorkerRegisterInput);
exports.WorkerRegisterInput = WorkerRegisterInput;
let WorkerResolver = class WorkerResolver {
    async workers(option) {
        const workers = worker_1.Worker.find({
            where: {
                job: option,
            },
        });
        return workers;
    }
    async search(category, city, keyword, orderBy, limit, skip) {
        if (orderBy == "" || orderBy == "rating") {
            if (category == "" && city == "") {
                const workers = await worker_1.Worker.find({
                    where: {
                        jobDescription: (0, typeorm_1.Like)(`%${keyword}%`),
                    },
                    order: {
                        rating: "DESC",
                    },
                    take: limit,
                    skip: skip,
                });
                return workers;
            }
            if (city == "") {
                const workers = await worker_1.Worker.find({
                    where: {
                        job: category,
                        jobDescription: (0, typeorm_1.Like)(`%${keyword}%`),
                    },
                    order: {
                        rating: "DESC",
                    },
                    take: limit,
                    skip: skip,
                });
                return workers;
            }
            if (category == "" && keyword == "") {
                const workers = await worker_1.Worker.find({
                    where: {
                        city: city,
                    },
                    order: {
                        rating: "DESC",
                    },
                    take: limit,
                    skip: skip,
                });
                return workers;
            }
            if (keyword == "") {
                const workers = await worker_1.Worker.find({
                    where: {
                        job: category,
                        city: city,
                    },
                    order: {
                        rating: "DESC",
                    },
                    take: limit,
                    skip: skip,
                });
                return workers;
            }
            if (city == "" && keyword == "") {
                const workers = await worker_1.Worker.find({
                    where: {
                        job: category,
                    },
                    order: {
                        rating: "DESC",
                    },
                    take: limit,
                    skip: skip,
                });
                return workers;
            }
            if (category == "") {
                const workers = await worker_1.Worker.find({
                    where: {
                        city: city,
                        jobDescription: (0, typeorm_1.Like)(`%${keyword}%`),
                    },
                    order: {
                        rating: "DESC",
                    },
                    take: limit,
                    skip: skip,
                });
                return workers;
            }
            if (category !== "" && city !== "" && keyword !== "") {
                const workers = await worker_1.Worker.find({
                    where: {
                        job: category,
                        city: city,
                        jobDescription: (0, typeorm_1.Like)(`%${keyword}%`),
                    },
                    order: {
                        rating: "DESC",
                    },
                    take: limit,
                    skip: skip,
                });
                return workers;
            }
        }
        else if (orderBy == "pricing") {
            if (category == "" && city == "") {
                const workers = await worker_1.Worker.find({
                    where: {
                        jobDescription: (0, typeorm_1.Like)(`%${keyword}%`),
                    },
                    order: {
                        price: "DESC",
                    },
                    take: limit,
                    skip: skip,
                });
                return workers;
            }
            if (city == "") {
                const workers = await worker_1.Worker.find({
                    where: {
                        job: category,
                        jobDescription: (0, typeorm_1.Like)(`%${keyword}%`),
                    },
                    order: {
                        price: "DESC",
                    },
                    take: limit,
                    skip: skip,
                });
                return workers;
            }
            if (category == "" && keyword == "") {
                const workers = await worker_1.Worker.find({
                    where: {
                        city: city,
                    },
                    order: {
                        price: "DESC",
                    },
                    take: limit,
                    skip: skip,
                });
                return workers;
            }
            if (keyword == "") {
                const workers = await worker_1.Worker.find({
                    where: {
                        job: category,
                        city: city,
                    },
                    order: {
                        price: "DESC",
                    },
                    take: limit,
                    skip: skip,
                });
                return workers;
            }
            if (city == "" && keyword == "") {
                const workers = await worker_1.Worker.find({
                    where: {
                        job: category,
                    },
                    order: {
                        price: "DESC",
                    },
                    take: limit,
                    skip: skip,
                });
                return workers;
            }
            if (category == "") {
                const workers = await worker_1.Worker.find({
                    where: {
                        city: city,
                        jobDescription: (0, typeorm_1.Like)(`%${keyword}%`),
                    },
                    order: {
                        price: "DESC",
                    },
                    take: limit,
                    skip: skip,
                });
                return workers;
            }
            if (category !== "" && city !== "" && keyword !== "") {
                const workers = await worker_1.Worker.find({
                    where: {
                        job: category,
                        city: city,
                        jobDescription: (0, typeorm_1.Like)(`%${keyword}%`),
                    },
                    order: {
                        price: "DESC",
                    },
                    take: limit,
                    skip: skip,
                });
                return workers;
            }
        }
        return [];
    }
    async workerById(id) {
        const worker = await worker_1.Worker.findOne({
            where: {
                id: id,
            },
        });
        return worker;
    }
    async list(option) {
        const workers = worker_1.Worker.find({
            where: {
                job: option,
            },
            order: {
                id: "ASC",
            },
        });
        return workers;
    }
    async isWorker({ req }) {
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
    async registerWorker(options, { req }) {
        if (!req.session.userId) {
            throw new Error("Not authenticated");
        }
        const user = await user_1.User.findOne({
            id: req.session.userId,
        });
        if (!(options.job in worker_1.JobCategory)) {
            return {
                errors: [
                    {
                        field: "job",
                        message: "invalid job",
                    },
                ],
            };
        }
        if (!(options.duration in worker_1.Duration)) {
            return {
                errors: [
                    {
                        field: "duration",
                        message: "invalid duration",
                    },
                ],
            };
        }
        if (!user) {
            throw new Error("not authenticated");
        }
        user.isWorker = true;
        await user_1.User.save(user);
        const worker = worker_1.Worker.create({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            phone: options.phone,
            city: options.city,
            job: options.job,
            jobDescription: options.jobDescription,
            price: parseInt(options.price),
            duration: options.duration,
        });
        await worker_1.Worker.save(worker);
        return {
            worker,
        };
    }
    async loginWorker(options, { req }) {
        const worker = await worker_1.Worker.findOne({
            email: options.email,
        });
        if (!worker) {
            return {
                errors: [
                    {
                        field: "email",
                        message: "This worker doesn't exist",
                    },
                ],
            };
        }
        const validPassword = await argon2_1.default.verify(worker.password, options.password);
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
        req.session.userId = worker.id;
        return {
            worker,
        };
    }
    logoutWorker({ req, res }) {
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
    async updateWorker(options, { req }) {
        if (!req.session.userId) {
            throw new Error("Not authenticated");
        }
        const worker = await worker_1.Worker.findOne({
            id: req.session.userId,
        });
        if (!(options.job in worker_1.JobCategory)) {
            return {
                errors: [
                    {
                        field: "job",
                        message: "invalid job",
                    },
                ],
            };
        }
        if (!(options.duration in worker_1.Duration)) {
            return {
                errors: [
                    {
                        field: "duration",
                        message: "invalid duration",
                    },
                ],
            };
        }
        if (!worker) {
            throw new Error("not authenticated");
        }
        worker.phone = options.phone;
        worker.city = options.city;
        worker.job = options.job;
        worker.title = options.title;
        worker.jobDescription = options.jobDescription;
        worker.price = parseInt(options.price);
        worker.duration = options.duration;
        await worker_1.Worker.save(worker);
        return {
            worker,
        };
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [worker_1.Worker]),
    __param(0, (0, type_graphql_1.Arg)("option")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkerResolver.prototype, "workers", null);
__decorate([
    (0, type_graphql_1.Query)(() => [worker_1.Worker]),
    __param(0, (0, type_graphql_1.Arg)("category", () => String)),
    __param(1, (0, type_graphql_1.Arg)("city", () => String)),
    __param(2, (0, type_graphql_1.Arg)("keyword", () => String)),
    __param(3, (0, type_graphql_1.Arg)("orderBy", () => String)),
    __param(4, (0, type_graphql_1.Arg)("limit", () => type_graphql_1.Int)),
    __param(5, (0, type_graphql_1.Arg)("skip", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], WorkerResolver.prototype, "search", null);
__decorate([
    (0, type_graphql_1.Query)(() => worker_1.Worker),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkerResolver.prototype, "workerById", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => [worker_1.Worker]),
    __param(0, (0, type_graphql_1.Arg)("option")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WorkerResolver.prototype, "list", null);
__decorate([
    (0, type_graphql_1.Query)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
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
    __metadata("design:paramtypes", [user_2.LoginInput, Object]),
    __metadata("design:returntype", Promise)
], WorkerResolver.prototype, "loginWorker", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WorkerResolver.prototype, "logoutWorker", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => WorkerResponse),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WorkerRegisterInput, Object]),
    __metadata("design:returntype", Promise)
], WorkerResolver.prototype, "updateWorker", null);
WorkerResolver = __decorate([
    (0, type_graphql_1.Resolver)(worker_1.Worker)
], WorkerResolver);
exports.WorkerResolver = WorkerResolver;
//# sourceMappingURL=worker.js.map