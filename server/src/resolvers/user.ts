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
import { validateEmail, validateRegister } from "../utils/validateRegister";
import {
  createConfirmationUrl,
  sendConfirmationEmail,
  sendFPEmail,
} from "../utils/nodemailer";
import { v4 } from "uuid";

@ObjectType()
export class ErrorField {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [ErrorField], {
    nullable: true,
  })
  errors?: ErrorField[];
  @Field(() => User, {
    nullable: true,
  })
  user?: User;
}

@InputType()
export class RegisterInput {
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
}

@InputType()
export class LoginInput {
  @Field()
  email: string;
  @Field()
  password: string;
}

@Resolver(User)
export class UserResolver {
  @Query(() => User, {
    nullable: true,
  })
  async me(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      return null;
    }
    const user = await User.findOne({
      id: req.session.userId,
    });

    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: RegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);
    const user = User.create({
      firstName: options.firstName,
      lastName: options.lastName,
      userName: options.userName,
      email: options.email,
      password: hashedPassword,
    });
    try {
      await User.save(user);
    } catch (err) {
      if (
        err.detail.includes("already exists") &&
        err.detail.includes("email")
      ) {
        return {
          errors: [
            {
              field: "email",
              message: "Email est déjà utilisé",
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
              message: "Nom d'utilisateur est déjà utilisé",
            },
          ],
        };
      }
    }

    await sendConfirmationEmail(
      user.email,
      await createConfirmationUrl(user.id)
    );
    req.session.userId = user.id;
    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  async sendConfirmationEmail(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      throw new Error("Not authenticated");
    }
    const user = await User.findOne({ id: req.session.userId });
    if (!user) {
      throw new Error("User does not exist");
    }
    await sendConfirmationEmail(
      user.email,
      await createConfirmationUrl(user.id)
    );
    return true;
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: LoginInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({
      email: options.email,
    });

    if (!user) {
      return {
        errors: [
          {
            field: "password",
            message: "Identifiants incorrectes.",
          },
        ],
      };
    }
    const validPassword = await argon2.verify(user.password, options.password);
    if (!validPassword) {
      return {
        errors: [
          {
            field: "password",
            message: "Identifiants incorrectes.",
          },
        ],
      };
    }

    req.session.userId = user.id;

    return {
      user: user,
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

  @Mutation(() => Boolean)
  async confirmUser(@Arg("token") token: string, @Ctx() { redis }: MyContext) {
    const userId = await redis.get(token);

    if (!userId) {
      return false;
    }
    await User.update({ id: userId }, { confirmed: true });
    await redis.del(token);
    return true;
  }

  @Mutation(() => Boolean)
  async changeEmail(@Arg("email") email: string, @Ctx() { req }: MyContext) {
    const user = await User.findOne({ id: req.session.userId });
    const worker = await Worker.findOne({ id: req.session.userId });
    if (!user || !worker) {
      throw new Error("User not found");
    }
    if (user.email == email) {
      throw new Error("You can't change it to your current email");
    }
    if (!validateEmail(email)) {
      throw new Error("Invalid email");
    } else {
      await User.update({ id: req.session.userId }, { email: email });
      await Worker.update({ id: req.session.userId }, { email: email });
      return true;
    }
  }

  @Mutation(() => UserResponse)
  async confirmPassword(
    @Arg("password", () => String) password: string,
    @Ctx() { req }: MyContext
  ) {
    const user = await User.findOne({ id: req.session.userId });
    if (!user) {
      return {
        errors: [
          {
            field: "password",
            message: "User not found",
          },
        ],
      };
    }
    const validPassword = await argon2.verify(user.password, password);
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

    return user;
  }

  @Mutation(() => Boolean)
  async forgetPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    const user = await User.findOne({ email: email });
    if (!user) {
      return true;
    }
    const token = v4();
    await redis.set("forgot_password" + token, user.id, "ex", 60 * 60 * 2);

    await sendFPEmail(user.email, token);
    return true;
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token", () => String) token: string,
    @Arg("password", () => String) password: string,
    @Arg("confirmedPassword", () => String) confirmedPassword: string,
    @Ctx() { redis, req }: MyContext
  ): Promise<UserResponse> {
    if (password.length <= 2) {
      return {
        errors: [
          {
            field: "password",
            message: "length must be greater than 2",
          },
        ],
      };
    }
    if (confirmedPassword != password) {
      return {
        errors: [
          {
            field: "confirmedPassword",
            message: "Passwords did not match",
          },
        ],
      };
    }

    const userId = await redis.get("forgot_password" + token);
    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "Invalid request",
          },
        ],
      };
    }
    const user = await User.findOne({ id: userId });
    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "User does'nt exist",
          },
        ],
      };
    }
    const validPassword = await argon2.verify(user.password, password);
    if (validPassword) {
      return {
        errors: [
          {
            field: "password",
            message:
              "You should enter a different password than the current one",
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(password);
    await User.update({ id: userId }, { password: hashedPassword });
    await Worker.update({ id: userId }, { password: hashedPassword });
    await redis.del("forgot_password" + token);
    req.session.userId = user.id;
    return { user };
  }

  @Mutation(() => UserResponse)
  async changePasswordFromProfil(
    @Arg("oldPassword", () => String) oldPassword: string,
    @Arg("password", () => String) password: string,
    @Arg("confirmedPassword", () => String) confirmedPassword: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    if (password.length <= 2) {
      return {
        errors: [
          {
            field: "password",
            message: "length must be greater than 2",
          },
        ],
      };
    }
    if (confirmedPassword != password) {
      return {
        errors: [
          {
            field: "confirmedPassword",
            message: "Passwords did not match",
          },
        ],
      };
    }

    if (!req.session.userId) {
      return {
        errors: [
          {
            field: "password",
            message: "Not authenticated",
          },
        ],
      };
    }
    const user = await User.findOne({ id: req.session.userId });
    if (!user) {
      return {
        errors: [
          {
            field: "password",
            message: "User does'nt exist",
          },
        ],
      };
    }
    const validPassword = await argon2.verify(user.password, oldPassword);
    if (!validPassword) {
      return {
        errors: [
          {
            field: "oldPassword",
            message: "Incorrect password",
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(password);
    await User.update({ id: req.session.userId }, { password: hashedPassword });
    await Worker.update(
      { id: req.session.userId },
      { password: hashedPassword }
    );

    return { user };
  }
}
