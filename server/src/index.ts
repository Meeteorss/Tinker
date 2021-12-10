import "dotenv/config";
import "reflect-metadata";
import { createConnection } from "typeorm";
import {
  COOKIE_NAME,
  SECRET,
  ___DB_PASSWORD,
  ___DB_USERNAME,
  ___prod___,
} from "./constants";

import { User } from "./entities/user";
import { Worker } from "./entities/worker";
import { Skill } from "./entities/skill";
import { Rating } from "./entities/rating";
import { Comment } from "./entities/comment";
import { Like } from "./entities/like";
import { Favorite } from "./entities/favorite";

import { UserResolver } from "./resolvers/user";
import { RatingResolver } from "./resolvers/rating";
import { WorkerResolver } from "./resolvers/worker";
import { UploadResolver } from "./resolvers/Upload";
import { CommentResolver } from "./resolvers/comment";
import { SkillResolver } from "./resolvers/skill";

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import session from "express-session";
import connectRedis from "connect-redis";
import { MyContext } from "./types";
import cors from "cors";
import path from "path";

import { redis } from "./utils/redis";
import { LikeResolver } from "./resolvers/like";
import { MessageResolver } from "./resolvers/message";
import { Message } from "./entities/message";
import { GlobalResolver } from "./resolvers/global";
import { FavoriteResolver } from "./resolvers/favorite";
import { AdminResolver } from "./resolvers/admin";
import { Admin } from "./entities/admin";
const main = async () => {
  const cnx = await createConnection({
    type: "postgres",
    database: "projectA",
    logging: false,
    migrations: [path.join(__dirname, "./migrations/*")],
    synchronize: true,
    entities: [
      User,
      Worker,
      Skill,
      Rating,
      Comment,
      Like,
      Favorite,
      Message,
      Admin,
    ],
    username: ___DB_USERNAME,
    password: ___DB_PASSWORD,
  });
  console.log("------", cnx.name);
  await cnx.runMigrations();
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  const RedisStore = connectRedis(session);

  // sdss
  app.use(
    session({
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
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        UserResolver,
        RatingResolver,
        WorkerResolver,
        UploadResolver,
        CommentResolver,
        SkillResolver,
        LikeResolver,
        FavoriteResolver,
        MessageResolver,
        GlobalResolver,
        AdminResolver,
      ],
      validate: false,
    }),

    context: ({ req, res }): MyContext => ({ req, res, redis }),
  });

  await apolloServer.start();
  await apolloServer.applyMiddleware({ app, cors: false });

  // await User.delete({ userName: "meeteorss" });
  // await Worker.delete({ userName: "meeteorss" });
  // await Skill.delete({});

  // rrrr

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main();
