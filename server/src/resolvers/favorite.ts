import { MyContext } from "src/types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

import { Worker } from "../entities/worker";
import { User } from "../entities/user";
import { Skill } from "../entities/skill";
import { getConnection, getManager } from "typeorm";
import { Favorite } from "../entities/favorite";

@Resolver(Favorite)
export class FavoriteResolver {
  @Mutation(() => Boolean)
  async favorite(
    @Arg("workerId", () => String) workerId: string,
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
    if (user.favoritesIds && user.favoritesIds.includes(workerId)) {
      return true;
    }

    const worker = await Worker.findOne({ id: workerId });
    if (!worker) {
      throw new Error("No tinker found");
    }

    // if (worker.id == user.id) {
    //   throw new Error("Cannot favorite yourself");
    // }
    const favorite = await Favorite.create({
      userId: user.id,
      workerId: workerId,
    });
    if (!user.favoritesIds) {
      user.favoritesIds = [favorite.workerId];
    } else {
      user.favoritesIds.push(favorite.workerId);
    }
    worker.favsCount++;
    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(favorite);
      await transactionalEntityManager.save(worker);
      await transactionalEntityManager.save(user);
    });

    return true;
  }

  @Mutation(() => Boolean)
  async unfavorite(
    @Arg("workerId", () => String) workerId: string,
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
    if (!user.favoritesIds || !user.favoritesIds.includes(workerId)) {
      throw new Error("This tinker is not in your favorite tinkers list");
    }

    const worker = await Worker.findOne({ id: workerId });
    if (!worker) {
      throw new Error("tinker does not exist");
    }

    // if (skill.workerId == user.id) {
    //   return false;
    // }

    user.favoritesIds = user.favoritesIds.filter((id) => {
      return !(id == workerId);
    });
    worker.favsCount--;

    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.delete(Favorite, {
        userId: user.id,
        workerId: workerId,
      });
      await transactionalEntityManager.save(worker);
      await transactionalEntityManager.save(user);
    });

    return true;
  }

  @Query(() => [Skill])
  async getFavoriteWorkers(@Ctx() { req }: MyContext) {
    if (!req.session.userId) {
      throw new Error("Not authenticated");
    }
    const user = await User.findOne({ id: req.session.userId });

    if (!user) {
      throw new Error("User does not excist");
    }
    const workers = await getConnection().query(`
    select id,username,"profilePicture",f."userId" from worker
    left join "favorite" as f on worker.id::text = f."workerId"::text
	  where f."userId"::text = '${user.id}' 
     `);

    if (!workers) {
      throw new Error("No favorite tinker found");
    }
    return workers;
  }

  @Query(() => Int)
  async getFavsCount(@Arg("workerId", () => String) workerId: string) {
    const count = await Favorite.findAndCount({
      where: { workerId: workerId },
    });
    return count[1];
  }
}
