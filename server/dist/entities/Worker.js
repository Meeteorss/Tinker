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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = exports.JobCategory = exports.Duration = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const rating_1 = require("./rating");
var Duration;
(function (Duration) {
    Duration[Duration["Hour"] = 0] = "Hour";
    Duration[Duration["Day"] = 1] = "Day";
    Duration[Duration["Week"] = 2] = "Week";
    Duration[Duration["Mounth"] = 3] = "Mounth";
    Duration[Duration["Task"] = 4] = "Task";
})(Duration = exports.Duration || (exports.Duration = {}));
var JobCategory;
(function (JobCategory) {
    JobCategory["Developper"] = "Developper";
    JobCategory["Editor"] = "Editor";
    JobCategory["Chef"] = "Chef";
    JobCategory["Plumber"] = "Plumber";
    JobCategory["Electrician"] = "Electrician";
})(JobCategory = exports.JobCategory || (exports.JobCategory = {}));
let Worker = class Worker extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryColumn)("uuid", { unique: true }),
    __metadata("design:type", String)
], Worker.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Worker.prototype, "firstName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Worker.prototype, "lastName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Worker.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Worker.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Worker.prototype, "phone", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Worker.prototype, "city", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Worker.prototype, "job", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Worker.prototype, "title", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Worker.prototype, "jobDescription", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], Worker.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Worker.prototype, "duration", void 0);
__decorate([
    (0, type_graphql_1.Field)({ defaultValue: true }),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Worker.prototype, "isActive", void 0);
__decorate([
    (0, type_graphql_1.Field)((type) => [rating_1.Rating]),
    (0, typeorm_1.OneToMany)(() => rating_1.Rating, (rating) => rating.worker),
    __metadata("design:type", Array)
], Worker.prototype, "ratings", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)("int", { nullable: true }),
    __metadata("design:type", Number)
], Worker.prototype, "ratingsValue", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)("int", { nullable: true }),
    __metadata("design:type", Number)
], Worker.prototype, "ratingsNumber", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)("float", { nullable: true, default: 0 }),
    __metadata("design:type", Number)
], Worker.prototype, "rating", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Worker.prototype, "profilePicture", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)("simple-array", { nullable: true, default: ["", "", "", ""] }),
    __metadata("design:type", Array)
], Worker.prototype, "pictures", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Worker.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Worker.prototype, "updatedAt", void 0);
Worker = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Worker);
exports.Worker = Worker;
//# sourceMappingURL=worker.js.map