import { MyContext } from "src/types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

import { Worker } from "../entities/worker";
import { User } from "../entities/user";
import { Skill } from "../entities/skill";
import { Like } from "../entities/like";
import { getConnection, getManager } from "typeorm";

@Resolver(Like)
export class LikeResolver {
  @Mutation(() => Boolean)
  async like(
    @Arg("skillId", () => String) skillId: string,
    // @Arg("userId", () => String) userId: string,
    @Ctx() { req }: MyContext
  ) {
    if (!req.session.userId) {
      throw new Error("Not authenticated");
    }
    const user = await User.findOne({ id: req.session.userId });
    if (!user) {
      throw new Error("User does not exist");
    }
    if (user.likesIds && user.likesIds.includes(skillId)) {
      throw new Error("Already Liked this skill");
    }

    const skill = await Skill.findOne({ id: skillId });
    if (!skill) {
      throw new Error("No skill found");
    }
    const worker = await Worker.findOne({
      id: skill.workerId,
    });
    if (!worker) {
      throw new Error("This skill has no owner");
    }
    // if (worker.id == user.id) {
    //   throw new Error("Cannot like its own skill");
    // }
    const like = await Like.create({
      userId: user.id,
      skillId: skillId,
    });
    if (!user.likesIds) {
      user.likesIds = [like.skillId];
    } else {
      user.likesIds.push(like.skillId);
    }
    skill.likesCount++;
    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(like);
      await transactionalEntityManager.save(skill);
      await transactionalEntityManager.save(user);
    });

    return true;
  }

  @Mutation(() => Boolean)
  async dislike(
    @Arg("skillId", () => String) skillId: string,
    // @Arg("userId", () => String) userId: string,
    @Ctx() { req }: MyContext
  ) {
    if (!req.session.userId) {
      throw new Error("Not authenticated");
    }
    const user = await User.findOne({ id: req.session.userId });
    // const user = await User.findOne({ id: userId });
    if (!user) {
      throw new Error("User does not exist");
    }
    if (!user.likesIds || !user.likesIds.includes(skillId)) {
      throw new Error("This skill is not in your liked skills list");
    }

    const skill = await Skill.findOne({ id: skillId });
    if (!skill) {
      throw new Error("Skill does not exist");
    }

    // if (skill.workerId == user.id) {
    //   return false;
    // }

    user.likesIds = user.likesIds.filter((id) => {
      return !(id == skillId);
    });
    skill.likesCount--;

    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.delete(Like, {
        userId: user.id,
        skillId: skillId,
      });
      await transactionalEntityManager.save(skill);
      await transactionalEntityManager.save(user);
    });

    return true;
  }

  @Query(() => [Skill])
  async getLikedSkills(
    // @Arg("userId", () => String) userId: string,
    @Ctx() { req }: MyContext
  ) {
    const user = await User.findOne({ id: req.session.userId });
    // const user = await User.findOne({ id: userId });
    if (!user) {
      throw new Error("Not authenticated");
    }
    // const likes = await Like.find({ where: { userId: user.id } });

    // const ids = likes.map((like: Like) => like.skillId);
    // const skills = await Skill.findByIds(ids);

    // const skills = await getRepository(Skill)
    //   .createQueryBuilder("skill")
    //   .leftJoinAndSelect(Like, "like", "like.skillId = skill.id")
    //   .where(`like.userId = ${user.id}`)
    //   .getMany();

    //where l."userId" = '668ae416-9dd9-4f0f-b78c-c567c19a7d2e'
    //where skill.id::text in(select "skillId"::text from "like" where l."userId"::text = '${user.id}' )
    const skills = await getConnection().query(`
    select id,title,worker,pictures,l."userId" from skill
    left join "like" as l on skill.id::text = l."skillId"::text
    where l."userId"::text = '${user.id}'
     `);
    // console.log("skills", skills);
    // skills.pictures = skills.pictures.split(",");
    skills.forEach((skill: any) => {
      // console.log("before",skill.pictures);

      skill.pictures = skill.pictures.split(",");
      // console.log("after",skill.pictures);
    });
    // //rrr
    // console.log("skills", skills);
    const returnedSkills = skills.map((skill: Skill) => ({
      skillId: skill.id,
      title: skill.title,
      worker: skill.worker,
    }));
    if (!returnedSkills) {
      throw new Error("No liked skill found");
    }
    if (!skills) {
      throw new Error("No liked skill found");
    }
    // return returnedSkills;
    return skills;
  }

  @Query(() => Int)
  async getLikesCount(@Arg("skillId", () => String) skillId: string) {
    const count = await Like.findAndCount({ where: { skillId: skillId } });
    return count[1];
  }
}
