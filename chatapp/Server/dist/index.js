"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const chat_1 = require("./resolvers/chat");
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const user_1 = require("./entities/user");
const chat_2 = require("./entities/chat");
const constants_1 = require("./constants");
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const redis_1 = require("./utils/redis");
const user_2 = require("./resolvers/user");
const graphql_redis_subscriptions_1 = require("graphql-redis-subscriptions");
const skill_1 = require("./entities/skill");
const rating_1 = require("./entities/rating");
const worker_1 = require("./entities/worker");
dotenv_1.default.config();
const main = async () => {
    const cnx = await (0, typeorm_1.createConnection)({
        type: "postgres",
        database: "projectA",
        logging: false,
        migrations: [path_1.default.join(__dirname, "./migrations/*")],
        synchronize: true,
        entities: [user_1.User, chat_2.Chat, worker_1.Worker, skill_1.Skill, rating_1.Rating],
        username: constants_1.___DB_USERNAME,
        password: constants_1.___DB_PASSWORD,
    });
    await cnx.runMigrations();
    const app = (0, express_1.default)();
    const httpServer = http_1.default.createServer(app);
    app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const sessionMiddleware = (0, express_session_1.default)({
        store: new RedisStore({ client: redis_1.redis, disableTouch: true }),
        name: constants_1.COOKIE_NAME,
        saveUninitialized: false,
        secret: constants_1.SECRET,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        },
    });
    app.use(sessionMiddleware);
    const pubsub = new graphql_redis_subscriptions_1.RedisPubSub();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [chat_1.ChatResolver, user_2.UserResolver],
            validate: false,
        }),
        subscriptions: {
            path: "/subscriptions",
            onConnect: (_, ws) => {
                console.log("Client connected for subscriptions");
                return new Promise((res) => sessionMiddleware(ws.upgradeReq, {}, () => {
                    res({ req: ws.upgradeReq });
                }));
            },
            onDisconnect: () => {
                console.log("Client disconnected from subscriptions");
            },
        },
        context: ({ req, res, connection }) => ({
            req,
            res,
            redis: redis_1.redis,
            pubsub,
            connection,
        }),
    });
    apolloServer.applyMiddleware({
        app,
        cors: false,
    });
    apolloServer.installSubscriptionHandlers(httpServer);
    httpServer.listen(9000, () => {
        console.log(`Server ready at http://localhost:9000${apolloServer.graphqlPath}`);
        console.log(`Subscriptions ready at ws://localhost:9000${apolloServer.subscriptionsPath}`);
    });
};
main().catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map