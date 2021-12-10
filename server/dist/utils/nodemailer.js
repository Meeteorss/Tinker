"use strict";
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
        pass: "projecta98^^",
    },
});
const createConfirmationUrl = async (userId) => {
    const token = (0, uuid_1.v4)();
    await redis_1.redis.set(token, userId, "ex", 60 * 60 * 24 * 7);
    return `http://localhost:3000/user/confirm/${token}`;
};
exports.createConfirmationUrl = createConfirmationUrl;
const sendConfirmationEmail = async (to, url) => {
    const mailOption = {
        from: "meeteorss.projecta@gmail.com",
        to: to,
        subject: "Confirmation email",
        html: `
    <h1>to confirm your email by clicking on the link below</h1>
    <a href="${url}">${url}</a>
    `,
    };
    await exports.transporter.sendMail(mailOption);
};
exports.sendConfirmationEmail = sendConfirmationEmail;
const sendFPEmail = async (to, token) => {
    const mailOption = {
        from: "meeteorss.projecta@gmail.com",
        to: to,
        subject: "Password reset demand",
        html: `
    <h1>To change the password click on the link below</h1>
    <a href="http://localhost:3000/user/change_password/${token}">Reset Password</a>
    `,
    };
    await exports.transporter.sendMail(mailOption);
};
exports.sendFPEmail = sendFPEmail;
//# sourceMappingURL=nodemailer.js.map