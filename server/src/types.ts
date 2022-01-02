import { Request, Response } from "express";
import { Stream } from "stream";
import { Redis } from "ioredis";
import { Session, SessionData } from "express-session";

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId: string };
  };
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
