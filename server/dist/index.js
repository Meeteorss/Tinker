"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const constants_1 = require("./constants");
const user_1 = require("./entities/user");
const worker_1 = require("./entities/worker");
const rating_1 = require("./entities/rating");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const user_2 = require("./resolvers/user");
const rating_2 = require("./resolvers/rating");
const worker_2 = require("./resolvers/worker");
const Upload_1 = require("./resolvers/Upload");
const redis_1 = __importDefault(require("redis"));
const express_session_1 = __importDefault(require("express-session"));
const connect_redis_1 = __importDefault(require("connect-redis"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const main = async () => {
    const cnx = await (0, typeorm_1.createConnection)({
        type: 'postgres',
        database: 'projectA',
        logging: false,
        migrations: [path_1.default.join(__dirname, "./migrations/*")],
        synchronize: true,
        entities: [user_1.User, worker_1.Worker, rating_1.Rating],
        username: constants_1.___DB_USERNAME,
        password: constants_1.___DB_PASSWORD
    });
    console.log("------", cnx.name);
    await cnx.runMigrations();
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({
        origin: "http://localhost:3000",
        credentials: true,
    }));
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const redisClient = redis_1.default.createClient({
        port: 6379,
        host: 'localhost'
    });
    app.use((0, express_session_1.default)({
        store: new RedisStore({ client: redisClient, disableTouch: true }),
        name: constants_1.COOKIE_NAME,
        saveUninitialized: false,
        secret: constants_1.SECRET,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        }
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [user_2.UserResolver, rating_2.RatingResolver, worker_2.WorkerResolver, Upload_1.UploadResolver],
            validate: false
        }),
        context: ({ req, res }) => ({ req, res }),
    });
    await apolloServer.start();
    await apolloServer.applyMiddleware({ app, cors: false });
    app.listen(4000, () => {
        console.log('server started on localhost:4000');
    });
};
main();
//# sourceMappingURL=index.js.map