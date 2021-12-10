import { Request, Response } from "express";
import { Stream } from "stream";
import { Redis } from "ioredis";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { ExecutionParams } from "subscriptions-transport-ws";

export type MyContext = {
  req: Request;
  res: Response;
  payload?: { userId: string };
  redis: Redis;
  pubsub: RedisPubSub;
  connection: ExecutionParams | undefined;
};
export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}
