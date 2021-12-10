//import { MyContext } from "src/types";
import "reflect-metadata";
import { User } from "../entities/user";
import { Worker } from "../entities/worker";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";

import { MyContext } from "src/types";
import { COOKIE_NAME, ___prod___ } from "../constants";
import { validateRegister } from "../utils/validateRegister";
import { Admin } from "../entities/admin";
import { Skill } from "../entities/skill";
import { ErrorField } from "./user";

@ObjectType()
class RegisterAdminResponse {
  @Field(() => [ErrorField], {
    nullable: true,
  })
  errors?: ErrorField[];
  @Field(() => Admin, {
    nullable: true,
  })
  admin?: Admin;
}

@InputType()
class AdminRegisterInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  userName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  confirmedPassword: string;

  @Field()
  role: string;
}

@InputType()
class AdminLoginInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@Resolver(User)
export class AdminResolver {
  @Query(() => Admin, {
    nullable: true,
  })
  async getCurrentAdmin(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }
    const admin = await Admin.findOne({
      id: req.session.userId,
    });

    return admin;
  }

  @Mutation(() => RegisterAdminResponse)
  async addAdmin(
    @Arg("options") options: AdminRegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<RegisterAdminResponse> {
    if (!req.session.userId) {
      return {
        errors: [
          {
            field: "firstName",
            message: "Log in as a super-admin first",
          },
        ],
      };
    }
    const superAdmin = await Admin.findOne({
      where: { id: req.session.userId },
    });
    if (!superAdmin || superAdmin.role != "SUPER_ADMIN") {
      return {
        errors: [
          {
            field: "firstName",
            message: "Not authorized",
          },
        ],
      };
    }
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);

    const admin = Admin.create({
      firstName: options.firstName,
      lastName: options.lastName,
      username: options.userName,
      email: options.email,
      password: hashedPassword,
      role: "ADMIN",
    });
    try {
      await Admin.save(admin);
    } catch (err) {
      if (
        err.detail.includes("already exists") &&
        err.detail.includes("email")
      ) {
        return {
          errors: [
            {
              field: "email",
              message: "Email already used",
            },
          ],
        };
      }
      if (
        err.detail.includes("already exists") &&
        err.detail.includes("userName")
      ) {
        return {
          errors: [
            {
              field: "userName",
              message: "username already used",
            },
          ],
        };
      }
    }

    req.session.userId = admin.id;
    return {
      admin,
    };
  }
  @Mutation(() => Boolean)
  async deleteAdmin(
    @Arg("username") username: string,
    @Ctx() { req }: MyContext
  ) {
    if (!req.session.userId) {
      throw new Error("Log in as a super-admin first");
    }
    const superAdmin = await Admin.findOne({
      where: { id: req.session.userId, role: "SUPER_ADMIN" },
    });
    if (!superAdmin) {
      throw new Error("Not authorized");
    }

    const admin = await Admin.findOne({ username: username });
    if (!admin) {
      throw new Error("No admin with this username found");
    }
    await Admin.delete({ username: username });
  }

  @Mutation(() => Boolean)
  async deleteUserProfilePic(
    @Arg("userId") userId: string,
    @Ctx() { req }: MyContext
  ) {
    if (!req.session.userId) {
      throw new Error("Not authenticated");
    }
    const admin = await Admin.findOne({ id: req.session.userId });
    if (!admin) {
      throw new Error("Admin required");
    }

    const user = await User.findOne({ id: userId });
    if (!user) {
      throw new Error("User does not exist");
    }
    if (user.isWorker) {
      await Worker.update({ id: userId }, { profilePicture: "" });
      await Skill.update({ workerId: userId }, { workerPicUrl: "" });
    }
    await User.update({ id: userId }, { profilePicture: "" });
  }
  @Mutation(() => Boolean)
  async deleteSkillPics(
    @Arg("skillId") skillId: string,
    @Ctx() { req }: MyContext
  ) {
    if (!req.session.userId) {
      throw new Error("Not authenticated");
    }
    const admin = await Admin.findOne({ id: req.session.userId });
    if (!admin) {
      throw new Error("Admin required");
    }
    const skill = await Skill.findOne({ id: skillId });
    if (!skill) {
      throw new Error("Skill does not exist");
    }
    await Skill.update({ id: skillId }, { pictures: ["", "", "", ""] });
    return true;
  }
  @Mutation(() => Boolean)
  async hideSkill(@Arg("skillId") skillId: string, @Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      throw new Error("Not authenticated");
    }
    const admin = await Admin.findOne({ id: req.session.userId });
    if (!admin) {
      throw new Error("Admin required");
    }
    const skill = await Skill.findOne({ id: skillId });
    if (!skill) {
      throw new Error("Skill does not exist");
    }
    await Skill.update({ id: skillId }, { status: "Hidden" });
    return true;
  }

  @Query(() => [User])
  async getAllUsers(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      throw new Error("Not authenticated");
    }
    const admin = await Admin.findOne({ id: req.session.userId });
    if (!admin) {
      throw new Error("Admin required");
    }
    const users = await User.find({});
    return users;
  }

  @Query(() => [Worker])
  async getAllWorkers(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      throw new Error("Not authenticated");
    }
    const admin = await Admin.findOne({ id: req.session.userId });
    if (!admin) {
      throw new Error("Admin required");
    }
    const workers = await Worker.find({});
    return workers;
  }

  @Query(() => [Skill])
  async getAllSkills(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      throw new Error("Not authenticated");
    }
    const admin = await Admin.findOne({ id: req.session.userId });
    if (!admin) {
      throw new Error("Admin required");
    }
    const skills = await Skill.find({});
    return skills;
  }

  @Mutation(() => RegisterAdminResponse)
  async adminLogin(
    @Arg("options") options: AdminLoginInput,
    @Ctx() { req }: MyContext
  ): Promise<RegisterAdminResponse> {
    const admin = await Admin.findOne({
      where: [{ username: options.username }],
    });

    if (!admin) {
      return {
        errors: [
          {
            field: "username",
            message: "admin doesn't exist",
          },
        ],
      };
    }
    const validPassword = await argon2.verify(admin.password, options.password);
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

    req.session.userId = admin.id;

    return {
      admin: admin,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
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
}
