//import { MyContext } from "src/types";
import "reflect-metadata";
import { User } from "../entities/user";
import { Worker } from "../entities/worker";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { MyContext } from "src/types";

import { ___prod___ } from "../constants";
import { ErrorField } from "./user";
import { validateWorkerRegister } from "../utils/validateWorkerRegister";

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
  sexe: string;

  @Field()
  dateOfBirth: Date;

  @Field()
  description: string;
}

@Resolver(Worker)
export class WorkerResolver {
  @FieldResolver()
  async age(@Root() parent: Worker) {
    const age = new Date().getFullYear() - parent.dateOfBirth.getFullYear();
    return age;
  }

  @FieldResolver()
  async fullName(@Root() parent: Worker) {
    const fullName = `${parent.firstName} ${parent.lastName}`;
    return fullName;
  }

  @FieldResolver()
  async email(@Root() parent: Worker, @Ctx() { req }: MyContext) {
    if (req.session.userId) {
      return parent.email;
    } else {
      return "";
    }
  }

  @Query(() => Worker, { nullable: true })
  async workerById(@Arg("id") id: string) {
    const worker = await Worker.findOne({
      where: {
        id: id,
      },
    });
    if (!worker) {
      return null;
    }
    return worker;
  }

  @Query(() => Worker, { nullable: true })
  async workerByUsername(@Arg("username") username: string) {
    const worker = await Worker.findOne({
      where: {
        userName: username,
      },
    });
    if (!worker) {
      return null;
    }

    return worker;
  }

  @Query(() => Boolean)
  async isWorker(
    @Arg("userId") userId: string,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    if (userId) {
      const user = await User.findOne({ id: userId });
      if (user?.isWorker) {
        return true;
      } else {
        return false;
      }
    } else {
      const user = await User.findOne({
        id: req.session.userId,
      });
      if (user!.isWorker) {
        return true;
      } else {
        return false;
      }
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
    const errors = validateWorkerRegister(options);
    if (errors) {
      return { errors };
    }
    if (!user) {
      throw new Error("not authenticated");
    }
    if (!user.confirmed) {
      throw new Error("Confirm email first");
    }

    user.isWorker = true;
    await User.save(user);
    let profilePicture = "";
    if (user.profilePicture != null) {
      profilePicture = user.profilePicture;
    }

    const worker = Worker.create({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      password: user.password,
      phone: options.phone,
      city: options.city,
      sexe: options.sexe,
      dateOfBirth: options.dateOfBirth,
      description: options.description,
      profilePicture: profilePicture,
    });
    await Worker.save(worker);
    return {
      worker,
    };
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
    const errors = validateWorkerRegister(options);
    if (errors) {
      return { errors };
    }
    if (!worker) {
      throw new Error("not authenticated");
    }
    worker.phone = options.phone;
    worker.city = options.city;
    worker.sexe = options.sexe;
    worker.dateOfBirth = options.dateOfBirth;
    worker.description = options.description;

    await Worker.save(worker);
    return {
      worker,
    };
  }

  @Query(() => [Worker])
  async workers() {
    return await Worker.find({});
  }
}
