//import { MyContext } from "src/types";
import "reflect-metadata";
import { User } from "../entities/user";
// import { Worker } from "../entities/worker";
import {
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
// import argon2 from "argon2";

import { MyContext } from "src/types";
import { COOKIE_NAME, ___prod___ } from "../constants";
import { getConnection } from "typeorm";
import { Skill } from "../entities/skill";
import { Worker } from "../entities/worker";
// import { validateEmail, validateRegister } from "../utils/validateRegister";
// import {
//   createConfirmationUrl,
//   sendConfirmationEmail,
//   sendFPEmail,
// } from "../utils/nodemailer";
// import { v4 } from "uuid";

@ObjectType()
class NavbarResponse {
  @Field(() => User, {
    nullable: true,
  })
  user?: User;
  @Field(() => [Skill], {
    nullable: true,
  })
  likes?: Skill[];
  @Field(() => [Worker], {
    nullable: true,
  })
  favs?: Worker[];
}

@ObjectType()
export class ErrorField {
  @Field()
  field: string;
  @Field()
  message: string;
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

  @Query(() => NavbarResponse)
  async navbarQuery(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      throw new Error("Not authenticated");
    }
    const user = await User.findOne({
      id: req.session.userId,
    });
    if (!user) {
      throw new Error("User does not exist");
    }
    const skills = await getConnection().query(`
    select id,title,worker,pictures from skill
    left join "like" as l on skill.id::text = l."skillId"::text
    where l."userId"::text = '${user.id}'
    `);
    if (!skills) {
      throw new Error("No liked skill found");
    }
    skills.forEach((skill: any) => {
      skill.pictures = skill.pictures.split(",");
    });
    const workers = await getConnection().query(`
    select id,"userName","profilePicture","rating","ratingsNumber" from worker
    left join "favorite" as f on worker.id::text = f."workerId"::text
	  where f."userId"::text = '${user.id}' 
     `);

    if (!workers) {
      throw new Error("No favorite tinker found");
    }

    return {
      user,
      likes: skills,
      favs: workers,
    };
  }
}
