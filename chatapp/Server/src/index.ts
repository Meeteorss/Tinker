import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { ChatResolver } from "./resolvers/chat";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { createConnection } from "typeorm";
import path from "path";
import { User } from "./entities/user";
import { Chat } from "./entities/chat";
import {
  COOKIE_NAME,
  SECRET,
  ___DB_PASSWORD,
  ___DB_USERNAME,
} from "./constants";
import session from "express-session";
import connectRedis from "connect-redis";
import { redis } from "./utils/redis";
import { UserResolver } from "./resolvers/user";
import { MyContext } from "./types";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { Skill } from "./entities/skill";
import { Rating } from "./entities/rating";
import { Worker } from "./entities/worker";

dotenv.config();

const main = async () => {
  const cnx = await createConnection({
    type: "postgres",
    database: "projectA",
    logging: false,
    migrations: [path.join(__dirname, "./migrations/*")],
    synchronize: true,
    entities: [User, Chat, Worker, Skill, Rating],
    username: ___DB_USERNAME,
    password: ___DB_PASSWORD,
  });
  await cnx.runMigrations();
  const app = express();
  const httpServer = http.createServer(app);

  app.use(cors({ origin: "http://localhost:3000", credentials: true }));

  const RedisStore = connectRedis(session);

  const sessionMiddleware = session({
    store: new RedisStore({ client: redis as any, disableTouch: true }),
    name: COOKIE_NAME,
    saveUninitialized: false,
    secret: SECRET,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  });

  app.use(sessionMiddleware);
  const pubsub = new RedisPubSub();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ChatResolver, UserResolver],
      validate: false,
    }),
    subscriptions: {
      path: "/subscriptions",
      onConnect: (_, ws: any) => {
        console.log("Client connected for subscriptions");
        return new Promise((res) =>
          sessionMiddleware(ws.upgradeReq, {} as any, () => {
            res({ req: ws.upgradeReq });
          })
        );
      },
      onDisconnect: () => {
        console.log("Client disconnected from subscriptions");
      },
    },
    context: ({ req, res, connection }): MyContext => ({
      req,
      res,
      redis,
      pubsub,
      connection,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });
  // await Chat.delete({});

  apolloServer.installSubscriptionHandlers(httpServer);

  httpServer.listen(9000, () => {
    console.log(
      `Server ready at http://localhost:9000${apolloServer.graphqlPath}`
    );
    console.log(
      `Subscriptions ready at ws://localhost:9000${apolloServer.subscriptionsPath}`
    );
  });
};

main().catch((err) => {
  console.log(err);
});
