import { Rating } from "../entities/rating";
import { MyContext } from "src/types";
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  registerEnumType,
  Resolver,
} from "type-graphql";

import { Worker } from "../entities/worker";
import { User } from "../entities/user";
import { Skill } from "../entities/skill";

enum RatingValues {
  one = 1,
  two = 2,
  three = 3,
  four = 4,
  five = 5,
}
registerEnumType(RatingValues, {
  name: "RatingValues",
  description: "Values that a rating can take",
});

@Resolver(Rating)
export class RatingResolver {
  @Mutation(() => Boolean)
  async rate(
    @Arg("workerId", () => String) workerId: string,
    @Arg("value", () => Int) value: RatingValues,
    // @Arg("userId", () => String) userId: string,
    @Ctx() { req }: MyContext
  ) {
    const user = await User.findOne({ id: req.session.userId });
    if (!user) {
      return false;
    }
    const worker = await Worker.findOne({
      id: workerId,
    });
    if (!worker) {
      return false;
    }
    const r = await Rating.findOne({
      where: { userId: req.session.userId, workerId: workerId },
    });
    if (r) {
      worker.ratingsValue = worker.ratingsValue - r.value + value;
      worker.rating = worker.ratingsValue / worker.ratingsNumber;
      // worker.skillsIds.map(async (s) => {
      //   const skill = await Skill.findOne({ id: s });
      //   if (skill) {
      //     skill.rating = worker.rating;
      //     await Skill.save(skill);
      //   }
      // });
      const skills = await Skill.findByIds(worker.skillsIds);
      skills.forEach((skill) => {
        skill.rating = worker.rating;
        skill.ratingsNumber = worker.ratingsNumber;
      });
      await Skill.save(skills);

      r.value = value;
      await Rating.save(r);
      await Worker.save(worker);
      return true;
    } else {
      const rating = Rating.create({ userId: user.id, workerId, value });
      await Rating.insert(rating);

      worker.ratingsValue += value;
      worker.ratingsNumber++;
      worker.rating = worker.ratingsValue / worker.ratingsNumber;
      await Worker.save(worker);
      // worker.skillsIds.map(async (s) => {
      //   const skill = await Skill.findOne({ id: s });
      //   if (skill) {
      //     skill.rating = worker.rating;
      //     await Skill.save(skill);
      //   }
      // });
      const skills = await Skill.findByIds(worker.skillsIds);
      skills.forEach((skill) => {
        skill.rating = worker.rating;
        skill.ratingsNumber = worker.ratingsNumber;
      });
      await Skill.save(skills);
      return true;
    }
  }
}
