import { MyContext } from "../types";
import { Arg, Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";
import { User } from "../entities/user";
import { Skill } from "../entities/skill";
import { Worker } from "../entities/worker";
import { getConnection } from "typeorm";

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
class SkillPageResponse {
  @Field(() => Skill, { nullable: true })
  skill: Skill;
  @Field(() => Worker, { nullable: true })
  worker: Worker;
  @Field(() => [Skill], { nullable: true })
  otherSkills: Skill[];
}

@ObjectType()
class WorkerPageResponse {
  @Field(() => Worker, { nullable: true })
  worker: Worker;
  @Field(() => [Skill], { nullable: true })
  skills: Skill[];
}

@Resolver()
export class GlobalResolver {
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

  @Query(() => SkillPageResponse)
  async skillPageQuery(
    @Arg("username") username: string,
    @Arg("title", () => String) title: string
  ) {
    title = title.replace(/_/g, " ");
    const worker = await Worker.findOne({
      where: {
        userName: username,
      },
    });
    const skills = await Skill.find({
      where: { worker: username },
    });

    if (!skills || !worker) {
      throw new Error("Skill or worker doesnt exist");
    }
    const skill = skills.find((s) => s.title == title);
    const otherSkills = skills.filter((s) => {
      return !(s == skill);
    });

    //rrr
    return {
      skill,
      worker,
      otherSkills,
    };
  }

  @Query(() => WorkerPageResponse)
  async workerPageQuery(@Arg("username") username: string) {
    const worker = await Worker.findOne({
      where: {
        userName: username,
      },
    });
    if (!worker) {
      return null;
    }
    const skills = await Skill.find({
      where: { worker: username, workerId: worker.id },
    });

    if (!skills || !worker) {
      return null;
    }

    return {
      worker,
      skills,
    };
  }
}
