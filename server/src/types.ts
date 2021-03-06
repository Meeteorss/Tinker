import { Request, Response } from "express";
import { Stream } from "stream";
import { Redis } from "ioredis";

export type MyContext = {
  req: Request;
  res: Response;
  payload?: { userId: string };
  redis: Redis;
};
export interface Upload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Stream;
}
