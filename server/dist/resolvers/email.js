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
exports.EmailResolver = void 0;
const nodemailer_1 = require("../utils/nodemailer");
const type_graphql_1 = require("type-graphql");
let EmailResolver = class EmailResolver {
    async sendConfirmationEmail(to) {
        const mailOption = {
            from: "meeteorss.projecta@gmail.com",
            to: to,
            subject: "test email",
            text: "test test test",
        };
        let info = await nodemailer_1.transporter.sendMail(mailOption);
        console.log("msg sent :", info.messageId);
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("to", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmailResolver.prototype, "sendConfirmationEmail", null);
EmailResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], EmailResolver);
exports.EmailResolver = EmailResolver;
//# sourceMappingURL=email.js.map