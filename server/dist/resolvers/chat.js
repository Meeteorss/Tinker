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
exports.ChatResolver = void 0;
const type_graphql_1 = require("type-graphql");
const chat_1 = require("../entities/chat");
const user_1 = require("../entities/user");
const channel = "CHAT_CHANNEL";
let ChatResolver = class ChatResolver {
    async createChat(recieverId, message, { req }, pubSub) {
        const users = await user_1.User.find({
            where: [{ id: req.session.userId }, { id: recieverId }],
        });
        const reciever = users.filter((u) => {
            return u.id == recieverId;
        })[0];
        const sender = users.filter((u) => {
            return u.id == req.session.userId;
        })[0];
        if (!sender) {
            throw new Error("Not authenticated");
        }
        if (!reciever) {
            throw new Error("Reciever doesnt exist");
        }
        if (!message || message == "") {
            throw new Error("You can't send an empty message");
        }
        const chat = chat_1.Chat.create({
            recieverId: reciever.id,
            senderId: sender.id,
            message: message,
        });
        await chat_1.Chat.insert(chat);
        const payload = chat;
        await pubSub.publish(channel, payload);
        return chat;
    }
    async getConversation(otherId, { req }) {
        const user = await user_1.User.findOne({
            where: { id: req.session.userId },
        });
        if (!user) {
            throw new Error("Not authenticated");
        }
        const chats = await chat_1.Chat.find({
            where: [
                { senderId: user.id, recieverId: otherId },
                { senderId: otherId, recieverId: user.id },
            ],
        });
        if (!chats) {
            throw new Error("You don't have any messages yet");
        }
        return chats;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => chat_1.Chat),
    __param(0, (0, type_graphql_1.Arg)("recieverId")),
    __param(1, (0, type_graphql_1.Arg)("message")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __param(3, (0, type_graphql_1.PubSub)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, type_graphql_1.PubSubEngine]),
    __metadata("design:returntype", Promise)
], ChatResolver.prototype, "createChat", null);
__decorate([
    (0, type_graphql_1.Query)(() => [chat_1.Chat]),
    __param(0, (0, type_graphql_1.Arg)("otherId", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChatResolver.prototype, "getConversation", null);
ChatResolver = __decorate([
    (0, type_graphql_1.Resolver)(chat_1.Chat)
], ChatResolver);
exports.ChatResolver = ChatResolver;
//# sourceMappingURL=chat.js.map