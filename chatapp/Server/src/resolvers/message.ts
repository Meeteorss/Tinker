import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";

import { User } from "../entities/user";
import { Message, RemovedBy } from "../entities/message";

@ObjectType()
class FormattedMessage {
  @Field(() => String, {
    nullable: true,
  })
  id?: String;
  @Field(() => String, {
    nullable: true,
  })
  user?: String;
  @Field(() => String, {
    nullable: true,
  })
  other?: String;
  @Field(() => String, {
    nullable: true,
  })
  userId?: String;
  @Field(() => String, {
    nullable: true,
  })
  otherId?: String;
  @Field(() => String, {
    nullable: true,
  })
  content?: String;
  @Field(() => String, {
    nullable: true,
  })
  state?: String;
  @Field(() => String, {
    nullable: true,
  })
  createdAt?: String;
}

@Resolver(Message)
export class MessageResolver {
  @Mutation(() => Boolean)
  async sendMessage(
    @Arg("recieverId", () => String) recieverId: string,
    @Arg("content", () => String) content: string,
    @Ctx() { req }: MyContext
  ) {
    // const sender = await User.findOne({ id: req.session.userId });
    // if (!sender) {
    //   throw new Error("Not authenticated")
    // }
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

    if (!content || content == "") {
      throw new Error("You can't send an empty message");
    }

    const message = Message.create({
      recieverId: reciever.id,
      senderId: sender.id,
      reciever: reciever.userName,
      sender: sender.userName,
      content: content,
      state: RemovedBy.NONE,
    });
    await Message.insert(message);

    return true;
  }

  @Mutation(() => Boolean)
  async unsendMessage(
    @Arg("messageId", () => String) messageId: string,
    @Ctx() { req }: MyContext
  ) {
    const sender = await User.findOne({
      where: { id: req.session.userId },
    });

    if (!sender) {
      throw new Error("Not authenticated");
    }
    const message = await Message.findOne({ id: messageId });
    if (!message) {
      throw new Error("This message no longer exists");
    }
    if (
      new Date().getTime() - new Date(message.createdAt).getTime() >
      1000 * 60 * 30
    ) {
      throw new Error("You cannot unsend this message anymore");
    }

    if (message.senderId != sender.id) {
      throw new Error("You cannot delete this message");
    }
    await Message.delete(message);
    return true;
  }

  @Mutation(() => Boolean)
  async removeMessage(
    @Arg("messageId", () => String) messageId: string,
    @Ctx() { req }: MyContext
  ) {
    const user = await User.findOne({
      where: { id: req.session.userId },
    });

    if (!user) {
      throw new Error("Not authenticated");
    }
    const message = await Message.findOne({ id: messageId });
    if (!message) {
      throw new Error("This message no longer exists");
    }
    let deleter: string;
    if (message.senderId == user.id) {
      deleter = RemovedBy.SENDER;
    } else {
      deleter = RemovedBy.RECIEVER;
    }
    if (message.state == RemovedBy.NONE) {
      if (message.senderId == user.id) {
        message.state = RemovedBy.SENDER;
      }
      if (message.recieverId == user.id) {
        message.state = RemovedBy.RECIEVER;
      }
    } else if (
      message.state == (RemovedBy.RECIEVER || RemovedBy.SENDER) &&
      message.state != deleter
    ) {
      await Message.delete(message);
    }

    return true;
  }

  @Query(() => [Message])
  async getMessages(@Ctx() { req }: MyContext) {
    const user = await User.findOne({
      where: { id: req.session.userId },
    });
    if (!user) {
      throw new Error("Not authenticated");
    }
    const messages = await Message.find({
      where: [{ senderId: user.id }, { recieverId: user.id }],
      order: { createdAt: "DESC" },
    });
    if (!messages) {
      throw new Error("You don't have any messages yet");
    }
    const sortedMessages = messages.filter((message) => {
      return (
        (message.state == RemovedBy.SENDER && message.senderId != user.id) ||
        (message.state == RemovedBy.RECIEVER &&
          message.recieverId != user.id) ||
        message.state == RemovedBy.NONE
      );
    });
    if (!sortedMessages) {
      throw new Error("You don't have any messages ");
    }
    return sortedMessages;
  }
  //r
  @Query(() => [FormattedMessage])
  async getConversations(@Ctx() { req }: MyContext) {
    const user = await User.findOne({
      where: { id: req.session.userId },
    });

    if (!user) {
      throw new Error("Not authenticated");
    }
    // select "message".id,"content",sender,"senderId",reciever,"recieverId","state","message"."createdAt",u."profilePicture" from "message"
    // left join "user" as u on "message"."senderId"::text = u.id::text  OR "message"."recieverId"::text = u.id::text
    // where u."id" = '8f78de56-d0d8-4610-b082-1aaf83cba115'
    // order by "message"."createdAt" DESC
    const messages = await Message.find({
      where: [{ senderId: user.id }, { recieverId: user.id }],
      order: { createdAt: "DESC" },
    });

    if (!messages) {
      throw new Error("You don't have any messages yet");
    }
    const filteredMessages = messages.filter((message) => {
      return (
        (message.state == RemovedBy.SENDER && message.senderId != user.id) ||
        (message.state == RemovedBy.RECIEVER &&
          message.recieverId != user.id) ||
        message.state == RemovedBy.NONE
      );
    });
    if (!filteredMessages) {
      throw new Error("You don't have any messages ");
    }

    const sortedMessages = filteredMessages.map((message: any) => {
      if (req.session.userId == message.senderId) {
        return {
          id: message.id,
          userId: message.senderId as string,
          user: message.sender as string,
          otherId: message.recieverId as string,
          other: message.reciever as string,
          content: message.content as string,
          state: message.state as string,
          createdAt: message.createdAt.toString(),
        };
      } else if (req.session.userId == message.recieverId) {
        return {
          id: message.id,
          userId: message.recieverId as string,
          user: message.reciever as string,
          otherId: message.senderId as string,
          other: message.sender as string,
          content: message.content as string,
          state: message.state as string,
          createdAt: message.createdAt.toString(),
        };
      } else {
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
    let othersIds: string[] = [];
    sortedMessages.forEach((message) => {
      if (!othersIds.includes(message!.otherId)) {
        othersIds.push(message!.otherId);
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
          } else {
            conversations[idx].push(message);
          }
        }
      });
    });

    let convos: FormattedMessage[] = [];
    conversations.map((convo, idx) => {
      convos[idx] = convo[0];
    });

    return convos;
  }
  @Query(() => [Message])
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
    const messages = await Message.find({
      where: [
        { senderId: user.id, recieverId: otherId },
        { senderId: otherId, recieverId: user.id },
      ],
    });

    if (!messages) {
      throw new Error("You don't have any messages yet");
    }
    const filteredMessages = messages.filter((message) => {
      return (
        (message.state == RemovedBy.SENDER && message.senderId != user.id) ||
        (message.state == RemovedBy.RECIEVER &&
          message.recieverId != user.id) ||
        message.state == RemovedBy.NONE
      );
    });
    if (!filteredMessages) {
      throw new Error("You don't have any messages ");
    }
    // const sortedMessages = filteredMessages.map((message: any) => {
    //   if (req.session.userId == message.senderId) {
    //     return {
    //       id: message.id,
    //       userId: message.senderId as string,
    //       user: message.sender as string,
    //       otherId: message.recieverId as string,
    //       other: message.reciever as string,
    //       content: message.content as string,
    //       state: message.state as string,
    //       createdAt: message.createdAt.toString(),
    //     };
    //   } else if (req.session.userId == message.recieverId) {
    //     return {
    //       id: message.id,
    //       userId: message.recieverId as string,
    //       user: message.reciever as string,
    //       otherId: message.senderId as string,
    //       other: message.sender as string,
    //       content: message.content as string,
    //       state: message.state as string,
    //       createdAt: message.createdAt.toString(),
    //     };
    //   } else {
    //     return {
    //       id: "",
    //       userId: "",
    //       user: "",
    //       otherId: "",
    //       other: "",
    //       content: "",
    //       state: "",
    //       createdAt: new Date().toString(),
    //     };
    //   }
    // });
    return filteredMessages;
  }
}
