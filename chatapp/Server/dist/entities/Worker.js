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
exports.Worker = exports.CityChoices = exports.JobCategory = exports.Duration = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const rating_1 = require("./rating");
const skill_1 = require("./skill");
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
    JobCategory["Barber"] = "Barber";
    JobCategory["Tailor"] = "Tailor";
    JobCategory["Photographer"] = "Photographer";
    JobCategory["Carpenter"] = "Carpenter";
    JobCategory["BlackSmith"] = "BlackSmith";
    JobCategory["Painter"] = "Painter";
    JobCategory["plasterer"] = "plasterer";
    JobCategory["Driver"] = "Driver";
    JobCategory["Housemaid"] = "Housemaid";
    JobCategory["Tutor"] = "Tutor";
    JobCategory["Coach"] = "Coach";
})(JobCategory = exports.JobCategory || (exports.JobCategory = {}));
var CityChoices;
(function (CityChoices) {
    CityChoices["Everywhere"] = "Everywhere";
    CityChoices["Marrakech"] = "Marrakech";
    CityChoices["Casablanca"] = "Casablanca";
    CityChoices["Tangier"] = "Tangier";
    CityChoices["Agadir"] = "Agadir";
    CityChoices["Rabat"] = "Rabat";
    CityChoices["Fez"] = "Fez";
    CityChoices["Sal\u00E9"] = "Sal\u00E9";
    CityChoices["Meknes"] = "Meknes";
    CityChoices["Oujda"] = "Oujda";
    CityChoices["Kenitra"] = "Kenitra";
    CityChoices["Tetouan"] = "Tetouan";
    CityChoices["Temara"] = "Temara";
    CityChoices["Safi"] = "Safi";
    CityChoices["Mohammedia"] = "Mohammedia";
    CityChoices["Khouribga"] = "Khouribga";
    CityChoices["El_Jadida"] = "El Jadida";
    CityChoices["Beni_Mellal"] = "Beni Mellal";
    CityChoices["Nador"] = "Nador";
    CityChoices["Settat"] = "Settat";
    CityChoices["Taza"] = "Taza";
    CityChoices["Berrechid"] = "Berrechid";
    CityChoices["Khmisset"] = "Khmisset";
    CityChoices["Guelmim"] = "Guelmim";
    CityChoices["Larache"] = "Larache";
    CityChoices["Khenifra"] = "Khenifra";
    CityChoices["Ben_guerir"] = "Ben guerir";
    CityChoices["Essaouira"] = "Essaouira";
    CityChoices["Ouarzazate"] = "Ouarzazate";
})(CityChoices = exports.CityChoices || (exports.CityChoices = {}));
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
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Worker.prototype, "userName", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], Worker.prototype, "fullName", void 0);
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
], Worker.prototype, "sexe", void 0);
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
    __metadata("design:type", Date)
], Worker.prototype, "dateOfBirth", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], Worker.prototype, "age", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Worker.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [String], { nullable: true }),
    (0, typeorm_1.Column)("simple-array", { nullable: true }),
    __metadata("design:type", Array)
], Worker.prototype, "skillsIds", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [skill_1.Skill]),
    __metadata("design:type", Array)
], Worker.prototype, "skills", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Worker.prototype, "favsCount", void 0);
__decorate([
    (0, type_graphql_1.Field)({ defaultValue: true }),
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Worker.prototype, "isActive", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [rating_1.Rating]),
    (0, typeorm_1.OneToMany)(() => rating_1.Rating, (rating) => rating.worker),
    __metadata("design:type", Array)
], Worker.prototype, "ratings", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)("int", { default: 0 }),
    __metadata("design:type", Number)
], Worker.prototype, "ratingsValue", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)("int", { default: 0 }),
    __metadata("design:type", Number)
], Worker.prototype, "ratingsNumber", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)("float", { default: 0 }),
    __metadata("design:type", Number)
], Worker.prototype, "rating", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Worker.prototype, "profilePicture", void 0);
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