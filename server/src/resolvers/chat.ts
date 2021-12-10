import { MyContext } from "../types";
import {
  Mutation,
  Query,
  Resolver,
  Arg,
  PubSub,
  PubSubEngine,
  Ctx,
} from "type-graphql";
import { Chat } from "../entities/chat";
import { User } from "../entities/user";

const channel = "CHAT_CHANNEL";

@Resolver(Chat)
export class ChatResolver {
  @Mutation(() => Chat)
  async createChat(
    @Arg("recieverId") recieverId: string,
    @Arg("message") message: string,
    @Ctx() { req }: MyContext,
    @PubSub() pubSub: PubSubEngine
  ): Promise<Chat> {
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

    const payload = chat;
    await pubSub.publish(channel, payload);
    return chat;
  }

  @Query(() => [Chat])
  async getConversation(
    @Arg("otherId", () => String) otherId: string,
    @Ctx() { req }: MyContext
  ) {
    const user = await User.findOne({
      where: { id: req.session.userId },
    });

    if (!user) {
      throw new Error("Not authenticated");
    }
    const chats = await Chat.find({
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
}
