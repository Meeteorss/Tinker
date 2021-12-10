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
exports.MessageResolver = void 0;
const type_graphql_1 = require("type-graphql");
const user_1 = require("../entities/user");
const message_1 = require("../entities/message");
let FormattedMessage = class FormattedMessage {
};
__decorate([
    (0, type_graphql_1.Field)(() => String, {
        nullable: true,
    }),
    __metadata("design:type", String)
], FormattedMessage.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, {
        nullable: true,
    }),
    __metadata("design:type", String)
], FormattedMessage.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, {
        nullable: true,
    }),
    __metadata("design:type", String)
], FormattedMessage.prototype, "other", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, {
        nullable: true,
    }),
    __metadata("design:type", String)
], FormattedMessage.prototype, "userId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, {
        nullable: true,
    }),
    __metadata("design:type", String)
], FormattedMessage.prototype, "otherId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, {
        nullable: true,
    }),
    __metadata("design:type", String)
], FormattedMessage.prototype, "content", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, {
        nullable: true,
    }),
    __metadata("design:type", String)
], FormattedMessage.prototype, "state", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, {
        nullable: true,
    }),
    __metadata("design:type", String)
], FormattedMessage.prototype, "createdAt", void 0);
FormattedMessage = __decorate([
    (0, type_graphql_1.ObjectType)()
], FormattedMessage);
let MessageResolver = class MessageResolver {
    async sendMessage(recieverId, content, { req }) {
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
        if (!content || content == "") {
            throw new Error("You can't send an empty message");
        }
        const message = message_1.Message.create({
            recieverId: reciever.id,
            senderId: sender.id,
            reciever: reciever.userName,
            sender: sender.userName,
            content: content,
            state: message_1.RemovedBy.NONE,
        });
        await message_1.Message.insert(message);
        return true;
    }
    async unsendMessage(messageId, { req }) {
        const sender = await user_1.User.findOne({
            where: { id: req.session.userId },
        });
        if (!sender) {
            throw new Error("Not authenticated");
        }
        const message = await message_1.Message.findOne({ id: messageId });
        if (!message) {
            throw new Error("This message no longer exists");
        }
        if (new Date().getTime() - new Date(message.createdAt).getTime() >
            1000 * 60 * 30) {
            throw new Error("You cannot unsend this message anymore");
        }
        if (message.senderId != sender.id) {
            throw new Error("You cannot delete this message");
        }
        await message_1.Message.delete(message);
        return true;
    }
    async removeMessage(messageId, { req }) {
        const user = await user_1.User.findOne({
            where: { id: req.session.userId },
        });
        if (!user) {
            throw new Error("Not authenticated");
        }
        const message = await message_1.Message.findOne({ id: messageId });
        if (!message) {
            throw new Error("This message no longer exists");
        }
        let deleter;
        if (message.senderId == user.id) {
            deleter = message_1.RemovedBy.SENDER;
        }
        else {
            deleter = message_1.RemovedBy.RECIEVER;
        }
        if (message.state == message_1.RemovedBy.NONE) {
            if (message.senderId == user.id) {
                message.state = message_1.RemovedBy.SENDER;
            }
            if (message.recieverId == user.id) {
                message.state = message_1.RemovedBy.RECIEVER;
            }
        }
        else if (message.state == (message_1.RemovedBy.RECIEVER || message_1.RemovedBy.SENDER) &&
            message.state != deleter) {
            await message_1.Message.delete(message);
        }
        return true;
    }
    async getMessages({ req }) {
        const user = await user_1.User.findOne({
            where: { id: req.session.userId },
        });
        if (!user) {
            throw new Error("Not authenticated");
        }
        const messages = await message_1.Message.find({
            where: [{ senderId: user.id }, { recieverId: user.id }],
            order: { createdAt: "DESC" },
        });
        if (!messages) {
            throw new Error("You don't have any messages yet");
        }
        const sortedMessages = messages.filter((message) => {
            return ((message.state == message_1.RemovedBy.SENDER && message.senderId != user.id) ||
                (message.state == message_1.RemovedBy.RECIEVER &&
                    message.recieverId != user.id) ||
                message.state == message_1.RemovedBy.NONE);
        });
        if (!sortedMessages) {
            throw new Error("You don't have any messages ");
        }
        return sortedMessages;
    }
    async getConversations({ req }) {
        const user = await user_1.User.findOne({
            where: { id: req.session.userId },
        });
        if (!user) {
            throw new Error("Not authenticated");
        }
        const messages = await message_1.Message.find({
            where: [{ senderId: user.id }, { recieverId: user.id }],
            order: { createdAt: "DESC" },
        });
        if (!messages) {
            throw new Error("You don't have any messages yet");
        }
        const filteredMessages = messages.filter((message) => {
            return ((message.state == message_1.RemovedBy.SENDER && message.senderId != user.id) ||
                (message.state == message_1.RemovedBy.RECIEVER &&
                    message.recieverId != user.id) ||
                message.state == message_1.RemovedBy.NONE);
        });
        if (!filteredMessages) {
            throw new Error("You don't have any messages ");
        }
        const sortedMessages = filteredMessages.map((message) => {
            if (req.session.userId == message.senderId) {
                return {
                    id: message.id,
                    userId: message.senderId,
                    user: message.sender,
                    otherId: message.recieverId,
                    other: message.reciever,
                    content: message.content,
                    state: message.state,
                    createdAt: message.createdAt.toString(),
                };
            }
            else if (req.session.userId == message.recieverId) {
                return {
                    id: message.id,
                    userId: message.recieverId,
                    user: message.reciever,
                    otherId: message.senderId,
                    other: message.sender,
                    content: message.content,
                    state: message.state,
                    createdAt: message.createdAt.toString(),
                };
            }
            else {
                return {
                    id: "",
                    userId: "",
                    user: "",
                    otherId: "",
                    other: "",
                    content: "",
                    state: "",
                    createdAt: new Date().toString(),
                };
            }
        });
        let othersIds = [];
        sortedMessages.forEach((message) => {
            if (!othersIds.includes(message.otherId)) {
                othersIds.push(message.otherId);
            }
        });
        let conversations = new Array(othersIds.length);
        conversations.forEach((_, idx) => {
            conversations[idx] = new Array();
        });
        othersIds.forEach((id, idx) => {
            sortedMessages.forEach((message) => {
                if (message.otherId == id) {
                    if (!conversations[idx]) {
                        conversations[idx] = [message];
                    }
                    else {
                        conversations[idx].push(message);
                    }
                }
            });
        });
        let convos = [];
        conversations.map((convo, idx) => {
            convos[idx] = convo[0];
        });
        return convos;
    }
    async getConversation(otherId, { req }) {
        const user = await user_1.User.findOne({
            where: { id: req.session.userId },
        });
        if (!user) {
            throw new Error("Not authenticated");
        }
        const messages = await message_1.Message.find({
            where: [
                { senderId: user.id, recieverId: otherId },
                { senderId: otherId, recieverId: user.id },
            ],
        });
        if (!messages) {
            throw new Error("You don't have any messages yet");
        }
        const filteredMessages = messages.filter((message) => {
            return ((message.state == message_1.RemovedBy.SENDER && message.senderId != user.id) ||
                (message.state == message_1.RemovedBy.RECIEVER &&
                    message.recieverId != user.id) ||
                message.state == message_1.RemovedBy.NONE);
        });
        if (!filteredMessages) {
            throw new Error("You don't have any messages ");
        }
        return filteredMessages;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("recieverId", () => String)),
    __param(1, (0, type_graphql_1.Arg)("content", () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "sendMessage", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("messageId", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "unsendMessage", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("messageId", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "removeMessage", null);
__decorate([
    (0, type_graphql_1.Query)(() => [message_1.Message]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "getMessages", null);
__decorate([
    (0, type_graphql_1.Query)(() => [FormattedMessage]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "getConversations", null);
__decorate([
    (0, type_graphql_1.Query)(() => [message_1.Message]),
    __param(0, (0, type_graphql_1.Arg)("otherId", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MessageResolver.prototype, "getConversation", null);
MessageResolver = __decorate([
    (0, type_graphql_1.Resolver)(message_1.Message)
], MessageResolver);
exports.MessageResolver = MessageResolver;
//# sourceMappingURL=message.js.map