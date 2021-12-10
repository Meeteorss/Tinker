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
const typeorm_1 = require("typeorm");
const graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
const channel = "NEW_MESSAGE";
let GetConversationResponse = class GetConversationResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => String, {
        nullable: true,
    }),
    __metadata("design:type", String)
], GetConversationResponse.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, {
        nullable: true,
    }),
    __metadata("design:type", String)
], GetConversationResponse.prototype, "senderId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, {
        nullable: true,
    }),
    __metadata("design:type", String)
], GetConversationResponse.prototype, "recieverId", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, {
        nullable: true,
    }),
    __metadata("design:type", String)
], GetConversationResponse.prototype, "sender", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, {
        nullable: true,
    }),
    __metadata("design:type", String)
], GetConversationResponse.prototype, "reciever", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, {
        nullable: true,
    }),
    __metadata("design:type", String)
], GetConversationResponse.prototype, "senderPic", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, {
        nullable: true,
    }),
    __metadata("design:type", String)
], GetConversationResponse.prototype, "recieverPic", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, {
        nullable: true,
    }),
    __metadata("design:type", String)
], GetConversationResponse.prototype, "message", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => Boolean, {
        nullable: true,
    }),
    __metadata("design:type", Boolean)
], GetConversationResponse.prototype, "isNew", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, {
        nullable: true,
    }),
    __metadata("design:type", String)
], GetConversationResponse.prototype, "createdAt", void 0);
GetConversationResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], GetConversationResponse);
let ChatResolver = class ChatResolver {
    async createChat(recieverId, message, { req }, pubSub) {
        if (recieverId == req.session.userId) {
            throw new Error("You can't message yourself");
        }
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
        const payload = {
            id: chat.id,
            senderId: chat.senderId,
            recieverId: chat.recieverId,
            createdAt: chat.createdAt,
            message: chat.message,
            isNew: chat.isNew,
            sender: sender.userName,
            reciever: reciever.userName,
        };
        await pubSub.publish(channel, {
            payload,
        });
        return chat;
    }
    async viewMessage(otherId, { req }) {
        if (!req.session.userId) {
            throw new Error("Not authenticated");
        }
        else {
            await chat_1.Chat.update({ recieverId: req.session.userId, senderId: otherId }, { isNew: false });
            return true;
        }
    }
    async getConversation(otherId, { req }) {
        const user = await user_1.User.findOne({
            where: { id: req.session.userId },
        });
        if (!user) {
            throw new Error("Not authenticated");
        }
        const chats = await (0, typeorm_1.getConnection)().query(`
        select "chat".id,"message","isNew","senderId","recieverId","chat"."createdAt",u."userName" as sender,u2."userName" as reciever,u."profilePicture" as "senderPic",u2."profilePicture" as "recieverPic" from chat
        left join "user" as u on "chat"."senderId"::text = u.id::text  
        left join "user" as u2 on "chat"."recieverId"::text = u2.id::text  
        where (u."id"::text = '${user.id}' AND u2."id"::text = '${otherId}') OR (u."id"::text ='${otherId}' AND u2."id"::text = '${user.id}')
        order by "chat"."createdAt" ASC,"chat"."id" DESC 
    `);
        if (!chats) {
            throw new Error("You don't have any messages yet");
        }
        return chats;
    }
    async getConversations({ req }) {
        const user = await user_1.User.findOne({
            where: { id: req.session.userId },
        });
        if (!user) {
            throw new Error("Not authenticated");
        }
        const chats = await (0, typeorm_1.getConnection)().query(`
    select "chat".id,"message","isNew","senderId","recieverId","chat"."createdAt",u."userName" as sender,u2."userName" as reciever,u."profilePicture" as "senderPic",u2."profilePicture" as "recieverPic" from chat
    left join "user" as u on "chat"."senderId"::text = u.id::text  
    left join "user" as u2 on "chat"."recieverId"::text = u2.id::text
    where chat."createdAt" in (select max("createdAt") from chat						  
      group by (least(chat."senderId",chat."recieverId")||'.' ||  greatest (chat."senderId",chat."recieverId")))  
      and (chat."senderId" = '${user.id}' or chat."recieverId" = '${user.id}' )
      order by chat."createdAt" DESC
    `);
        if (!chats) {
            throw new Error("You don't have any conversation yet");
        }
        chats.forEach((chat) => {
            chat.createdAt = chat.createdAt.toString();
        });
        return chats;
    }
    messageSent(chat) {
        return chat;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => chat_1.Chat),
    __param(0, (0, type_graphql_1.Arg)("recieverId")),
    __param(1, (0, type_graphql_1.Arg)("message")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __param(3, (0, type_graphql_1.PubSub)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, graphql_redis_subscriptions_1.RedisPubSub]),
    __metadata("design:returntype", Promise)
], ChatResolver.prototype, "createChat", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("otherId", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChatResolver.prototype, "viewMessage", null);
__decorate([
    (0, type_graphql_1.Query)(() => [GetConversationResponse]),
    __param(0, (0, type_graphql_1.Arg)("otherId", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChatResolver.prototype, "getConversation", null);
__decorate([
    (0, type_graphql_1.Query)(() => [GetConversationResponse]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatResolver.prototype, "getConversations", null);
__decorate([
    (0, type_graphql_1.Subscription)({
        topics: channel,
        filter: async ({ payload, context }) => context.connection.context.req.session.userId ==
            payload.payload.senderId ||
            context.connection.context.req.session.userId ==
                payload.payload.recieverId,
    }),
    __param(0, (0, type_graphql_1.Root)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GetConversationResponse]),
    __metadata("design:returntype", GetConversationResponse)
], ChatResolver.prototype, "messageSent", null);
ChatResolver = __decorate([
    (0, type_graphql_1.Resolver)(chat_1.Chat)
], ChatResolver);
exports.ChatResolver = ChatResolver;
//# sourceMappingURL=chat.js.map