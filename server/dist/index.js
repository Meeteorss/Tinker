"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("module-alias/register");
require("dotenv-safe/config");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const constants_1 = require("./constants");
const user_1 = require("./entities/user");
const worker_1 = require("./entities/worker");
const skill_1 = require("./entities/skill");
const rating_1 = require("./entities/rating");
const comment_1 = require("./entities/comment");
const like_1 = require("./entities/like");
const favorite_1 = require("./entities/favorite");
const user_2 = require("./resolvers/user");
const rating_2 = require("./resolvers/rating");
const worker_2 = require("./resolvers/worker");
const upload_1 = require("./resolvers/upload");
const comment_2 = require("./resolvers/comment");
const skill_2 = require("./resolvers/skill");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const redis_1 = require("./utils/redis");
const like_2 = require("./resolvers/like");
const message_1 = require("./resolvers/message");
const message_2 = require("./entities/message");
const global_1 = require("./resolvers/global");
const favorite_2 = require("./resolvers/favorite");
const admin_1 = require("./resolvers/admin");
const admin_2 = require("./entities/admin");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const cnx = yield (0, typeorm_1.createConnection)({
        type: "postgres",
        url: process.env.DATABASE_URL,
        logging: false,
        migrations: [path_1.default.join(__dirname, "./migrations/*")],
        synchronize: !constants_1.___prod___,
        entities: [
            user_1.User,
            worker_1.Worker,
            skill_1.Skill,
            rating_1.Rating,
            comment_1.Comment,
            like_1.Like,
            favorite_1.Favorite,
            message_2.Message,
            admin_2.Admin,
        ],
    });
    if (constants_1.___prod___) {
        yield cnx.runMigrations();
    }
    const app = (0, express_1.default)();
    app.set("trust proxy", 1);
    const whitelist = ["http://localhost:3000"];
    app.use((0, cors_1.default)({
        origin: (origin, callback) => {
            var originIsWhitelisted = whitelist.indexOf(origin) !== -1 || (origin === null || origin === void 0 ? void 0 : origin.includes("tinker.ma"));
            callback(null, originIsWhitelisted);
        },
        credentials: true,
        optionsSuccessStatus: 200,
    }));
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    app.use((0, express_session_1.default)({
        store: new RedisStore({ client: redis_1.redis, disableTouch: true }),
        name: constants_1.COOKIE_NAME,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            secure: constants_1.___prod___,
            sameSite: "lax",
            domain: constants_1.___prod___ ? ".tinker.ma" : undefined,
        },
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield (0, type_graphql_1.buildSchema)({
            resolvers: [
                user_2.UserResolver,
                rating_2.RatingResolver,
                worker_2.WorkerResolver,
                upload_1.UploadResolver,
                comment_2.CommentResolver,
                skill_2.SkillResolver,
                like_2.LikeResolver,
                favorite_2.FavoriteResolver,
                message_1.MessageResolver,
                global_1.GlobalResolver,
                admin_1.AdminResolver,
            ],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res, redis: redis_1.redis }),
    });
    yield apolloServer.start();
    yield apolloServer.applyMiddleware({ app, cors: false });
    app.listen(parseInt(process.env.PORT), () => {
        console.log("server started successfully");
        console.log(`server started on localhost:${process.env.PORT}`);
    });
});
main();
//# sourceMappingURL=index.js.map