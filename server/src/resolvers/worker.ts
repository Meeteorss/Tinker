//import { MyContext } from "src/types";
import "reflect-metadata";
import { User } from "../entities/user";
import { Duration, JobCategory, Worker } from "../entities/worker";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import { MyContext } from "src/types";

import { COOKIE_NAME, ___prod___ } from "../constants";
import { ErrorField, LoginInput } from "./user";
import { Like } from "typeorm";

@ObjectType()
class WorkerResponse {
  @Field(() => [ErrorField], {
    nullable: true,
  })
  errors?: ErrorField[];
  @Field(() => Worker, {
    nullable: true,
  })
  worker?: Worker;
}

@InputType()
export class WorkerRegisterInput {
  @Field()
  phone: string;

  @Field()
  city: string;

  @Field()
  job: string;

  @Field()
  title: string;

  @Field()
  jobDescription: string;

  @Field()
  price: string;

  @Field()
  duration: string;
}

@Resolver(Worker)
export class WorkerResolver {
  @Query(() => [Worker])
  async workers(@Arg("option") option: string): Promise<Worker[]> {
    const workers = Worker.find({
      where: {
        job: option,
      },
    });
    return workers;
  }

  @Query(() => [Worker])
  async search(
    @Arg("category", () => String) category: string | null,
    @Arg("city", () => String) city: string | null,
    @Arg("keyword", () => String) keyword: string | null,
    @Arg("orderBy", () => String) orderBy: string | null,
    @Arg("limit", () => Int) limit: number | undefined,
    @Arg("skip", () => Int) skip: number | undefined
  ): Promise<Worker[]> {
    if (orderBy == "" || orderBy == "rating") {
      if (category == "" && city == "") {
        const workers = await Worker.find({
          where: {
            jobDescription: Like(`%${keyword}%`),
          },
          order: {
            rating: "DESC",
          },
          take: limit,
          skip: skip,
        });
        return workers;
      }
      if (city == "") {
        const workers = await Worker.find({
          where: {
            job: category,
            jobDescription: Like(`%${keyword}%`),
          },
          order: {
            rating: "DESC",
          },
          take: limit,
          skip: skip,
        });
        return workers;
      }
      if (category == "" && keyword == "") {
        const workers = await Worker.find({
          where: {
            city: city,
          },
          order: {
            rating: "DESC",
          },
          take: limit,
          skip: skip,
        });
        return workers;
      }
      if (keyword == "") {
        const workers = await Worker.find({
          where: {
            job: category,
            city: city,
          },
          order: {
            rating: "DESC",
          },
          take: limit,
          skip: skip,
        });
        return workers;
      }
      if (city == "" && keyword == "") {
        const workers = await Worker.find({
          where: {
            job: category,
          },
          order: {
            rating: "DESC",
          },
          take: limit,
          skip: skip,
        });
        return workers;
      }
      if (category == "") {
        const workers = await Worker.find({
          where: {
            city: city,
            jobDescription: Like(`%${keyword}%`),
          },
          order: {
            rating: "DESC",
          },
          take: limit,
          skip: skip,
        });
        return workers;
      }
      if (category !== "" && city !== "" && keyword !== "") {
        const workers = await Worker.find({
          where: {
            job: category,
            city: city,
            jobDescription: Like(`%${keyword}%`),
          },
          order: {
            rating: "DESC",
          },
          take: limit,
          skip: skip,
        });
        return workers;
      }
    } else if (orderBy == "pricing") {
      if (category == "" && city == "") {
        const workers = await Worker.find({
          where: {
            jobDescription: Like(`%${keyword}%`),
          },
          order: {
            price: "DESC",
          },
          take: limit,
          skip: skip,
        });
        return workers;
      }
      if (city == "") {
        const workers = await Worker.find({
          where: {
            job: category,
            jobDescription: Like(`%${keyword}%`),
          },
          order: {
            price: "DESC",
          },
          take: limit,
          skip: skip,
        });
        return workers;
      }
      if (category == "" && keyword == "") {
        const workers = await Worker.find({
          where: {
            city: city,
          },
          order: {
            price: "DESC",
          },
          take: limit,
          skip: skip,
        });
        return workers;
      }
      if (keyword == "") {
        const workers = await Worker.find({
          where: {
            job: category,
            city: city,
          },
          order: {
            price: "DESC",
          },
          take: limit,
          skip: skip,
        });
        return workers;
      }
      if (city == "" && keyword == "") {
        const workers = await Worker.find({
          where: {
            job: category,
          },
          order: {
            price: "DESC",
          },
          take: limit,
          skip: skip,
        });
        return workers;
      }
      if (category == "") {
        const workers = await Worker.find({
          where: {
            city: city,
            jobDescription: Like(`%${keyword}%`),
          },
          order: {
            price: "DESC",
          },
          take: limit,
          skip: skip,
        });
        return workers;
      }
      if (category !== "" && city !== "" && keyword !== "") {
        const workers = await Worker.find({
          where: {
            job: category,
            city: city,
            jobDescription: Like(`%${keyword}%`),
          },
          order: {
            price: "DESC",
          },
          take: limit,
          skip: skip,
        });
        return workers;
      }
    }

    return [];
  }

  @Query(() => Worker)
  async workerById(@Arg("id") id: string): Promise<Worker> {
    const worker = await Worker.findOne({
      where: {
        id: id,
      },
    });
    return worker!;
  }

  @Mutation(() => [Worker])
  async list(@Arg("option") option: string): Promise<Worker[]> {
    const workers = Worker.find({
      where: {
        job: option,
      },
      order: {
        id: "ASC",
      },
    });
    return workers;
  }

  @Query(() => Boolean)
  async isWorker(@Ctx() { req }: MyContext) {
    const user = await User.findOne({
      id: req.session.userId,
    });
    if (user!.isWorker) {
      return true;
    } else {
      return false;
    }
  }

  @Mutation(() => WorkerResponse)
  async registerWorker(
    @Arg("options") options: WorkerRegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<WorkerResponse> {
    if (!req.session.userId) {
      throw new Error("Not authenticated");
    }
    const user = await User.findOne({
      id: req.session.userId,
    });
    if (!(options.job in JobCategory)) {
      return {
        errors: [
          {
            field: "job",
            message: "invalid job",
          },
        ],
      };
    }
    if (!(options.duration in Duration)) {
      return {
        errors: [
          {
            field: "duration",
            message: "invalid duration",
          },
        ],
      };
    }
    if (!user) {
      throw new Error("not authenticated");
    }

    user.isWorker = true;
    await User.save(user);
    const worker = Worker.create({
      id: user!.id,
      firstName: user!.firstName,
      lastName: user!.lastName,
      email: user!.email,
      password: user!.password,
      phone: options.phone,
      city: options.city,
      job: options.job,
      jobDescription: options.jobDescription,
      price: parseInt(options.price),
      duration: options.duration,
    });
    await Worker.save(worker);
    return {
      worker,
    };
  }

  @Mutation(() => WorkerResponse)
  async loginWorker(
    @Arg("options") options: LoginInput,
    @Ctx() { req }: MyContext
  ): Promise<WorkerResponse> {
    const worker = await Worker.findOne({
      email: options.email,
    });

    if (!worker) {
      return {
        errors: [
          {
            field: "email",
            message: "This worker doesn't exist",
          },
        ],
      };
    }
    const validPassword = await argon2.verify(
      worker.password,
      options.password
    );
    if (!validPassword) {
      return {
        errors: [
          {
            field: "password",
            message: "Password incorrect",
          },
        ],
      };
    }

    req.session.userId = worker.id;

    return {
      worker,
    };
  }

  @Mutation(() => Boolean)
  logoutWorker(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }

  @Mutation(() => WorkerResponse)
  async updateWorker(
    @Arg("options") options: WorkerRegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<WorkerResponse> {
    if (!req.session.userId) {
      throw new Error("Not authenticated");
    }
    const worker = await Worker.findOne({
      id: req.session.userId,
    });
    if (!(options.job in JobCategory)) {
      return {
        errors: [
          {
            field: "job",
            message: "invalid job",
          },
        ],
      };
    }
    if (!(options.duration in Duration)) {
      return {
        errors: [
          {
            field: "duration",
            message: "invalid duration",
          },
        ],
      };
    }
    if (!worker) {
      throw new Error("not authenticated");
    }
    worker.phone = options.phone;
    worker.city = options.city;
    worker.job = options.job;
    worker.title = options.title;
    worker.jobDescription = options.jobDescription;
    worker.price = parseInt(options.price);
    worker.duration = options.duration;

    await Worker.save(worker);
    return {
      worker,
    };
  }
}
