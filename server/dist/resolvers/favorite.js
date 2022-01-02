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
exports.FavoriteResolver = void 0;
const type_graphql_1 = require("type-graphql");
const worker_1 = require("../entities/worker");
const user_1 = require("../entities/user");
const skill_1 = require("../entities/skill");
const typeorm_1 = require("typeorm");
const favorite_1 = require("../entities/favorite");
let FavoriteResolver = class FavoriteResolver {
    favorite(workerId, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                throw new Error("Not authenticated");
            }
            const user = yield user_1.User.findOne({ id: req.session.userId });
            if (!user) {
                throw new Error("User does not exist");
            }
            if (user.favoritesIds && user.favoritesIds.includes(workerId)) {
                return true;
            }
            const worker = yield worker_1.Worker.findOne({ id: workerId });
            if (!worker) {
                throw new Error("No tinker found");
            }
            const favorite = yield favorite_1.Favorite.create({
                userId: user.id,
                workerId: workerId,
            });
            if (!user.favoritesIds) {
                user.favoritesIds = [favorite.workerId];
            }
            else {
                user.favoritesIds.push(favorite.workerId);
            }
            worker.favsCount++;
            yield (0, typeorm_1.getManager)().transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                yield transactionalEntityManager.save(favorite);
                yield transactionalEntityManager.save(worker);
                yield transactionalEntityManager.save(user);
            }));
            return true;
        });
    }
    unfavorite(workerId, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                throw new Error("Not authenticated");
            }
            const user = yield user_1.User.findOne({ id: req.session.userId });
            if (!user) {
                throw new Error("User does not exist");
            }
            if (!user.favoritesIds || !user.favoritesIds.includes(workerId)) {
                throw new Error("This tinker is not in your favorite tinkers list");
            }
            const worker = yield worker_1.Worker.findOne({ id: workerId });
            if (!worker) {
                throw new Error("tinker does not exist");
            }
            user.favoritesIds = user.favoritesIds.filter((id) => {
                return !(id == workerId);
            });
            worker.favsCount--;
            yield (0, typeorm_1.getManager)().transaction((transactionalEntityManager) => __awaiter(this, void 0, void 0, function* () {
                yield transactionalEntityManager.delete(favorite_1.Favorite, {
                    userId: user.id,
                    workerId: workerId,
                });
                yield transactionalEntityManager.save(worker);
                yield transactionalEntityManager.save(user);
            }));
            return true;
        });
    }
    getFavoriteWorkers({ req }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.session.userId) {
                throw new Error("Not authenticated");
            }
            const user = yield user_1.User.findOne({ id: req.session.userId });
            if (!user) {
                throw new Error("User does not excist");
            }
            const workers = yield (0, typeorm_1.getConnection)().query(`
    select id,username,"profilePicture",f."userId" from worker
    left join "favorite" as f on worker.id::text = f."workerId"::text
	  where f."userId"::text = '${user.id}' 
     `);
            if (!workers) {
                throw new Error("No favorite tinker found");
            }
            return workers;
        });
    }
    getFavsCount(workerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield favorite_1.Favorite.findAndCount({
                where: { workerId: workerId },
            });
            return count[1];
        });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("workerId", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FavoriteResolver.prototype, "favorite", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("workerId", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FavoriteResolver.prototype, "unfavorite", null);
__decorate([
    (0, type_graphql_1.Query)(() => [skill_1.Skill]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FavoriteResolver.prototype, "getFavoriteWorkers", null);
__decorate([
    (0, type_graphql_1.Query)(() => type_graphql_1.Int),
    __param(0, (0, type_graphql_1.Arg)("workerId", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FavoriteResolver.prototype, "getFavsCount", null);
FavoriteResolver = __decorate([
    (0, type_graphql_1.Resolver)(favorite_1.Favorite)
], FavoriteResolver);
exports.FavoriteResolver = FavoriteResolver;
//# sourceMappingURL=favorite.js.map