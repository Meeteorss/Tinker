import "dotenv/config";
import "module-alias/register";
import "dotenv-safe/config";
import "reflect-metadata";
import { createConnection } from "typeorm";
import {
  COOKIE_NAME,
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
import { UploadResolver } from "./resolvers/upload";
import { CommentResolver } from "./resolvers/comment";
import { SkillResolver } from "./resolvers/skill";

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import session from "express-session";
import connectRedis from "connect-redis";
// import { MyContext } from "./types";
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
    // database: "projectA",
    // username: ___DB_USERNAME,
    // password: ___DB_PASSWORD,
    url: process.env.DATABASE_URL,
    logging: false,
    migrations: [path.join(__dirname, "./migrations/*")],
    synchronize: !___prod___,
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
    // entities: [Rating, User, Worker, "entities/*"],
  });
  //console.log("------", cnx.name);
  if (___prod___) {
    await cnx.runMigrations();
  }

  const app = express();
  app.set("trust proxy", 1);
  // app.use((req, res, next) => {
  //   res.header(
  //     "Access-Control-Allow-Origin",
  //     process.env.CORS_ORIGIN as string
  //   );
  //   res.header(
  //     "Access-Control-Allow-Methods",
  //     "GET, PUT, POST, DELETE, OPTIONS"
  //   );
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "Content-Type, Authorization, Content-Length, X-Requested-With"
  //   );
  //   res.header("Access-Control-Allow-Credentials", "true");

  //   if ("OPTIONS" === req.method) {
  //     res.status(200).send();
  //   } else {
  //     next();
  //   }
  // });
  const whitelist = ["http://localhost:3000"];
  app.use(
    cors({
      // origin: process.env.CORS_ORIGIN as string,
      origin: (origin, callback) => {
        // console.log("origin:", origin);
        var originIsWhitelisted =
          whitelist.indexOf(origin!) !== -1 || origin?.includes("tinker.ma");
        callback(null, originIsWhitelisted);
      },
      credentials: true,
      optionsSuccessStatus: 200,
    })
  );

  const RedisStore = connectRedis(session);

  // sdssrrrrr
  app.use(
    session({
      store: new RedisStore({ client: redis as any, disableTouch: true }),
      name: COOKIE_NAME,
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        secure: ___prod___,
        sameSite: "lax",
        domain: ___prod___ ? ".tinker.ma" : undefined,
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
    context: ({ req, res }) => ({ req, res, redis }),
    // context: ({ req, res }): MyContext => ({ req, res, redis }),
  });

  await apolloServer.start();
  await apolloServer.applyMiddleware({ app, cors: false });

  // rrrr

  app.listen(parseInt(process.env.PORT as string), () => {
    console.log("server started successfully");
    console.log(`server started on localhost:${process.env.PORT}`);
  });
};

main();
