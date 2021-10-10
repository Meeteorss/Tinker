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
exports.RatingResolver = void 0;
const rating_1 = require("../entities/rating");
const type_graphql_1 = require("type-graphql");
const worker_1 = require("../entities/worker");
var RatingValues;
(function (RatingValues) {
    RatingValues[RatingValues["one"] = 1] = "one";
    RatingValues[RatingValues["two"] = 2] = "two";
    RatingValues[RatingValues["three"] = 3] = "three";
    RatingValues[RatingValues["four"] = 4] = "four";
    RatingValues[RatingValues["five"] = 5] = "five";
})(RatingValues || (RatingValues = {}));
(0, type_graphql_1.registerEnumType)(RatingValues, { name: "RatingValues", description: "Values that a rating can take" });
let RatingResolver = class RatingResolver {
    async rate(workerId, value, userId, { req }) {
        const rating = rating_1.Rating.create({ userId, workerId, value });
        await rating_1.Rating.insert(rating);
        console.log(rating);
        const worker = await worker_1.Worker.findOne({
            id: workerId
        });
        if (!worker) {
            return null;
        }
        worker.ratingsValue += value;
        worker.ratingsNumber++;
        worker.rating = worker.ratingsValue / worker.ratingsNumber;
        await worker_1.Worker.save(worker);
        if (!rating) {
            return null;
        }
        return rating;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => rating_1.Rating || null),
    __param(0, (0, type_graphql_1.Arg)("workerId", () => String)),
    __param(1, (0, type_graphql_1.Arg)("value", () => type_graphql_1.Int)),
    __param(2, (0, type_graphql_1.Arg)("userId", () => String)),
    __param(3, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String, Object]),
    __metadata("design:returntype", Promise)
], RatingResolver.prototype, "rate", null);
RatingResolver = __decorate([
    (0, type_graphql_1.Resolver)(rating_1.Rating)
], RatingResolver);
exports.RatingResolver = RatingResolver;
//# sourceMappingURL=rating.js.map