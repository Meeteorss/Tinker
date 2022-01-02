"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendFPEmail = exports.sendConfirmationEmail = exports.createConfirmationUrl = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const uuid_1 = require("uuid");
const redis_1 = require("./redis");
exports.transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: "meeteorss.projecta@gmail.com",
        pass: "projecttinker98^^",
    },
});
const createConfirmationUrl = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const token = (0, uuid_1.v4)();
    yield redis_1.redis.set(token, userId, "ex", 60 * 60 * 24 * 7);
    return `https://tinker.ma/user/confirm/${token}`;
});
exports.createConfirmationUrl = createConfirmationUrl;
const sendConfirmationEmail = (to, url) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOption = {
        from: "meeteorss.projecta@gmail.com",
        to: to,
        subject: "Confirmation email",
        html: `
    <h1>Confirmez votre email en cliquant sur le lien ci-dessous.</h1>
    <a href="${url}">${url}</a>
    `,
    };
    yield exports.transporter.sendMail(mailOption);
});
exports.sendConfirmationEmail = sendConfirmationEmail;
const sendFPEmail = (to, token) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOption = {
        from: "meeteorss.projecta@gmail.com",
        to: to,
        subject: "Demande de changement de mot de passe",
        html: `
    <h1>Pour changer votre mot de passe cliquez sur le lien ce-dessous.</h1>
    <a href="https://tinker.ma/user/change_password/${token}">Reset Password</a>
    `,
    };
    yield exports.transporter.sendMail(mailOption);
});
exports.sendFPEmail = sendFPEmail;
//# sourceMappingURL=nodemailer.js.map