import { MyContext } from "../types";
import {
  Mutation,
  Query,
  Resolver,
  Arg,
  Subscription,
  PubSub,
  Root,
  Ctx,
  Field,
  ObjectType,
} from "type-graphql";
import { Chat } from "../entities/chat";
import { User } from "../entities/user";
import { getConnection } from "typeorm";

import { RedisPubSub } from "graphql-redis-subscriptions";

const channel = "NEW_MESSAGE";

@ObjectType()
class GetConversationResponse {
  @Field(() => String, {
    nullable: true,
  })
  id: String;
  @Field(() => String, {
    nullable: true,
  })
  senderId: String;
  @Field(() => String, {
    nullable: true,
  })
  recieverId: String;
  @Field(() => String, {
    nullable: true,
  })
  sender?: String;
  @Field(() => String, {
    nullable: true,
  })
  reciever?: String;
  @Field(() => String, {
    nullable: true,
  })
  senderPic?: String;
  @Field(() => String, {
    nullable: true,
  })
  recieverPic?: String;
  @Field(() => String, {
    nullable: true,
  })
  message: String;

  @Field(() => Boolean, {
    nullable: true,
  })
  isNew: boolean;

  @Field(() => String, {
    nullable: true,
  })
  createdAt: String;
}

@Resolver(Chat)
export class ChatResolver {
  @Mutation(() => Chat)
  async createChat(
    @Arg("recieverId") recieverId: string,
    @Arg("message") message: string,
    @Ctx() { req }: MyContext,
    @PubSub() pubSub: RedisPubSub
  ): Promise<Chat> {
    if (recieverId == req.session.userId) {
      throw new Error("You can't message yourself");
    }
    const users = await User.find({
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

    const chat = Chat.create({
      recieverId: reciever.id,
      senderId: sender.id,
      message: message,
    });
    await Chat.insert(chat);

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
    // await pubSub.publish(channel, payload);

    await pubSub.publish(channel, {
      payload,
    });

    return chat;
  }

  @Mutation(() => Boolean)
  async viewMessage(
    @Arg("otherId", () => String) otherId: string,
    @Ctx() { req }: MyContext
  ) {
    if (!req.session.userId) {
      throw new Error("Not authenticated");
    } else {
      await Chat.update(
        { recieverId: req.session.userId, senderId: otherId },
        { isNew: false }
      );
      return true;
    }
  }

  @Query(() => [GetConversationResponse])
  async getConversation(
    @Arg("otherId", () => String) otherId: string,
    @Ctx() { req }: MyContext
  ) {
    // const user = await User.findOne({
    //   where: { id: "a0fb7e9e-283e-410a-a58a-dbee6ef3d9b6" },
    // });

    const user = await User.findOne({
      where: { id: req.session.userId },
    });

    if (!user) {
      throw new Error("Not authenticated");
    }

    const chats = await getConnection().query(`
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

  @Query(() => [GetConversationResponse])
  async getConversations(@Ctx() { req }: MyContext) {
    // const user = await User.findOne({
    //   where: { id: "a0fb7e9e-283e-410a-a58a-dbee6ef3d9b6" },
    // });

    const user = await User.findOne({
      where: { id: req.session.userId },
    });

    if (!user) {
      throw new Error("Not authenticated");
    }

    const chats = await getConnection().query(`
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

    chats.forEach((chat: GetConversationResponse) => {
      chat.createdAt = chat.createdAt.toString();
    });
    // console.log("chats", chats[0].createdAt.toString());

    return chats;
  }

  // @Subscription({
  //   topics: channel,
  //   filter: async ({ payload, args, context, info }) =>
  //     context.connection.context.req.session.userId ==
  //       payload.payload.senderId ||
  //     context.connection.context.req.session.userId ==
  //       payload.payload.recieverId,
  // })
  @Subscription({
    topics: channel,
    filter: async ({ payload, context }) =>
      context.connection.context.req.session.userId ==
        payload.payload.senderId ||
      context.connection.context.req.session.userId ==
        payload.payload.recieverId,
  })
  messageSent(
    @Root() chat: GetConversationResponse
    // @Args() { otherId }: SubArgs,
    // @Arg("otherId", () => String) otherId: string,
  ): GetConversationResponse {
    return chat;
  }
}
