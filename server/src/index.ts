import 'dotenv/config';
import "reflect-metadata";
import {  createConnection } from "typeorm";
import { COOKIE_NAME, SECRET, ___DB_PASSWORD, ___DB_USERNAME, ___prod___ } from "./constants";
import { User } from "./entities/user";
import { Worker } from './entities/worker';
import { Rating } from './entities/rating';

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user";
import { RatingResolver } from "./resolvers/rating";
import { WorkerResolver } from './resolvers/worker';
import { UploadResolver } from './resolvers/Upload';

import redis from 'redis';
import session from 'express-session';
import  connectRedis from 'connect-redis';
import { MyContext } from './types';
import cors from "cors";
import path from 'path';





const main = async () => {
        const cnx = await createConnection({
        type:'postgres',
        database:'projectA',
        logging:false,
        migrations:[path.join(__dirname,"./migrations/*")],
        synchronize:true,
        entities: [User,Worker,Rating],  
        username:___DB_USERNAME,
        password:___DB_PASSWORD
       }) 
       console.log("------",cnx.name)
       await cnx.runMigrations()   
       const app = express();

       app.use(
           cors({
            origin:"http://localhost:3000",
            credentials:true,
       }))
       const RedisStore = connectRedis(session)
       const redisClient = redis.createClient({
           port: 6379,
           host: 'localhost'
       }) 
        
       app.use(
       session({
           store: new RedisStore({ client: redisClient, disableTouch:true }),
           name: COOKIE_NAME,
           saveUninitialized: false,
           secret:SECRET,
           resave: false,
           cookie:{
               maxAge: 1000*60*60*24*365*10, 
               httpOnly: true,
               secure: false,
               sameSite:'lax',
               
           }
       })
       )

       const apolloServer = new  ApolloServer ({ 
           schema: await buildSchema({
               resolvers :[UserResolver,RatingResolver,WorkerResolver,UploadResolver],
               validate:false
           }),
           context: ({req,res}):MyContext => ({req,res}),
           
           
       }); 
       
       
       
       await apolloServer.start()
       await apolloServer.applyMiddleware({ app,cors:false });

       app.listen(4000, () => {
           console.log('server started on localhost:4000')
       })  
       
}

main()

 


    
   



