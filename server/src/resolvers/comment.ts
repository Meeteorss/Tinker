import { MyContext } from "src/types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

import { Worker } from "../entities/worker";
import { User } from "../entities/user";
import { Comment } from "../entities/comment";
import { Skill } from "../entities/skill";
import { getConnection } from "typeorm";

@Resolver(Comment)
export class CommentResolver {
  @Mutation(() => Boolean)
  async comment(
    @Arg("skillId", () => String) skillId: string,
    @Arg("content", () => String) content: string,
    @Ctx() { req }: MyContext
  ) {
    const user = await User.findOne({ id: req.session.userId });
    if (!user) {
      return false;
    }

    const skill = await Skill.findOne({ id: skillId });
    if (!skill) {
      return false;
    }
    const worker = await Worker.findOne({
      id: skill.workerId,
    });
    if (!worker) {
      return false;
    }
    if (!content || content == "") {
      return false;
    }
    if (worker.id == user.id) {
      return false;
    }
    const com = await Comment.findOne({
      where: { userId: req.session.userId, skillId: skillId },
    });
    if (!com) {
      const comment = Comment.create({
        userId: user.id,
        author: user.userName,
        worker: worker.userName,
        workerId: worker.id,
        skillId: skillId,
        content: content,
      });
      await Comment.insert(comment);

      return true;
    } else {
      com.content = content;
      await Comment.save(com);

      return true;
    }
  }

  @Query(() => [Comment])
  async commentsBySkill(
    @Arg("title", () => String) title: string,
    @Arg("worker", () => String) worker: string,
    @Arg("limit", () => Int) limit: number | undefined,
    @Arg("skip", () => Int) skip: number | undefined
  ) {
    const comments = await getConnection().query(`
    select "c"."id","c"."content","c"."skillId","c"."userId","c"."author","c"."workerId","c"."worker" ,"c"."createdAt","c"."updatedAt" from comment as c
    left join "skill" as s on s.id::text = c."skillId"::text
	  where s."title"::text = '${title.replace(
      /_/g,
      " "
    )}' AND  s."worker"::text = '${worker}'
    order by "c"."updatedAt" DESC,"c"."id" DESC 
    LIMIT ${limit} OFFSET ${skip}
     `);

    return comments;
  }

  @Query(() => [Comment])
  async commentsByWorker(
    @Arg("worker", () => String) worker: string,
    @Arg("limit", () => Int) limit: number | undefined,
    @Arg("skip", () => Int) skip: number | undefined
  ) {
    // const comments = await Comment.find({
    //   where: { workerId: workerId },
    //   order: { updatedAt: "DESC" },
    //   take: limit,
    //   skip: skip,
    //  });

    const comments = await getConnection().query(`
    select "c"."id","c"."content","c"."skillId","c"."userId","c"."author","c"."workerId","c"."worker" ,"c"."createdAt","c"."updatedAt" from comment as c
    left join "worker" as w on w."id"::text = c."workerId"::text
	  where w."userName"::text = '${worker}' 
    order by "c"."updatedAt" DESC,"c"."id" DESC
    LIMIT ${limit} OFFSET ${skip}
     `);

    return comments;
  }
}
