import { Skill } from "../entities/skill";
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
import { Worker } from "../entities/worker";
import { ErrorField } from "./user";
import { MyContext } from "src/types";
import {
  validateSkillCreationS1,
  validateSkillCreationS2,
  validateSkillCreationS3,
  validateSkillUpdate,
} from "../utils/validateInput";
import { getConnection } from "typeorm";

@ObjectType()
class CreateSkillResponse {
  @Field(() => [ErrorField], {
    nullable: true,
  })
  errors?: ErrorField[];
  @Field(() => Skill, {
    nullable: true,
  })
  skill?: Skill;
}

@InputType()
export class CreateSkillS1Input {
  @Field()
  category!: string;

  @Field()
  zone: string;

  @Field()
  title!: string;
}

@InputType()
export class CreateSkillS2Input {
  @Field()
  description!: string;
}

@InputType()
export class CreateSkillS3Input {
  @Field()
  pricing!: string;

  @Field()
  duration: number;
}

@InputType()
export class UpdateSkillInput {
  @Field()
  category!: string;

  @Field()
  zone: string;

  @Field()
  title!: string;

  @Field()
  description!: string;

  @Field()
  pricing!: string;

  @Field()
  duration: number;
}

@Resolver(Skill)
export class SkillResolver {
  // @FieldResolver()
  // async worker(@Root() parent: Skill) {
  //   const worker = await Worker.findOne({ id: parent.workerId });
  //   return worker?.userName;
  // }

  // @FieldResolver()
  // async workerPicUrl(@Root() parent: Skill) {
  //   const worker = await Worker.findOne({ id: parent.workerId });
  //   return worker?.profilePicture;
  // }

  // @FieldResolver()
  // async ratingsNumber(@Root() parent: Skill) {
  //   const worker = await Worker.findOne({ id: parent.workerId });
  //   return worker?.ratingsNumber;
  // }

  // async rating(@Root() parent: Skill) {
  //   const worker = await Worker.findOne({ id: parent.workerId });
  //   return worker?.rating;
  // }

  @Mutation(() => CreateSkillResponse)
  async createSkillS1(
    @Arg("options") options: CreateSkillS1Input,
    @Ctx() { req }: MyContext
  ): Promise<CreateSkillResponse> {
    if (!req.session.userId) {
      throw new Error("Not authenticated");
    }
    const errors = validateSkillCreationS1(options);
    if (errors) {
      return { errors };
    }
    const worker = await Worker.findOne({ id: req.session.userId });
    if (!worker) {
      throw new Error("Regular users cannot create skills");
    }

    const skill = await Skill.create({
      workerId: req.session.userId,
      category: options.category,
      title: options.title,
      zone: options.zone,
      rating: worker.rating,
      ratingsNumber: worker.ratingsNumber,
      worker: worker.userName,
      workerPicUrl: worker.profilePicture,
      status: "Pending",
      pictures: ["", "", "", ""],
    });
    await Skill.save(skill);
    if (!worker.skillsIds) {
      worker.skillsIds = [skill.id];
    } else {
      worker.skillsIds.push(skill.id);
    }

    await Worker.save(worker);
    return {
      skill,
    };
  }

  @Mutation(() => CreateSkillResponse)
  async createSkillS2(
    @Arg("options") options: CreateSkillS2Input,
    @Arg("skillId", () => String) skillId: string,
    @Ctx() { req }: MyContext
  ): Promise<CreateSkillResponse> {
    if (!req.session.userId) {
      throw new Error("Not authenticated");
    }
    const errors = validateSkillCreationS2(options);
    if (errors) {
      return { errors };
    }
    const skill = await Skill.findOne({ id: skillId });

    if (!skill) {
      throw new Error("This skill does'nt exist");
    }
    if (skill.workerId != req.session.userId) {
      throw new Error("You don't have access to this skill");
    }

    const worker = await Worker.findOne({ id: req.session.userId });
    if (!worker) {
      throw new Error("Not authenticated");
    }
    skill.description = options.description;
    await Skill.save(skill);
    return {
      skill,
    };
  }

  @Mutation(() => CreateSkillResponse)
  async createSkillS3(
    @Arg("options") options: CreateSkillS3Input,
    @Arg("skillId", () => String) skillId: string,
    @Ctx() { req }: MyContext
  ): Promise<CreateSkillResponse> {
    if (!req.session.userId) {
      throw new Error("Not authenticated");
    }
    const errors = validateSkillCreationS3(options);
    if (errors) {
      return { errors };
    }
    const skill = await Skill.findOne({ id: skillId });

    if (!skill) {
      throw new Error("This skill does'nt exist");
    }
    if (skill.workerId != req.session.userId) {
      throw new Error("You don't have access to this skill");
    }

    const worker = await Worker.findOne({ id: req.session.userId });
    if (!worker) {
      throw new Error("Not authenticated");
    }
    skill.duration = options.duration;
    skill.pricing = parseInt(options.pricing);
    skill.status = "Finished";
    await Skill.save(skill);
    return {
      skill,
    };
  }

  @Mutation(() => CreateSkillResponse)
  async updateSkill(
    @Arg("options") options: UpdateSkillInput,
    @Arg("skillId", () => String) skillId: string,
    @Ctx() { req }: MyContext
  ): Promise<CreateSkillResponse> {
    const worker = await Worker.findOne({ id: req.session.userId });
    if (!req.session.userId || req.session.userId != worker?.id) {
      throw new Error("Not authenticated");
    }
    const errors = validateSkillUpdate(options);
    if (errors) {
      return { errors };
    }
    const skill = await Skill.findOne({ id: skillId });
    if (!skill) {
      throw new Error("no skill found");
    }
    skill.category = options.category;
    skill.title = options.title;
    skill.description = options.description;
    skill.pricing = parseInt(options.pricing);
    skill.duration = options.duration;
    skill.zone = options.zone;
    skill.status = "Finished";
    await Skill.save(skill);
    return {
      skill,
    };
  }

  @Mutation(() => Boolean)
  async deleteSkill(
    @Arg("skillId", () => String) skillId: string,
    @Ctx() { req }: MyContext
  ) {
    const worker = await Worker.findOne({ id: req.session.userId });
    const skill = await Skill.findOne({ id: skillId });
    if (!req.session.userId || req.session.userId != worker?.id) {
      throw new Error("Not authenticated");
    }
    if (!skill) {
      return false;
    }
    worker.skillsIds.forEach((skillId, idx) => {
      if (skillId == skill.id) {
        worker.skillsIds.splice(idx, 1);
      }
    });
    await Worker.save(worker);
    await Skill.delete({ id: skillId });

    return true;
  }

  @Query(() => [Skill])
  async getSkills(
    @Arg("workerId", () => String) workerId: string,
    @Ctx() { req }: MyContext
  ) {
    const skills = await Skill.find({ where: { workerId: workerId } });

    if (!skills) {
      return [];
    }
    return skills;
  }

  @Query(() => Skill || null)
  async getSkill(@Arg("skillId", () => String) skillId: string) {
    const skill = await Skill.findOne({ id: skillId });
    if (!skill) {
      return null;
    }
    return skill;
  }

  @Query(() => Skill, { nullable: true })
  async getSkillByTitle(
    @Arg("title", () => String) title: string,
    @Arg("workerId", () => String) workerId: string
  ) {
    const skill = await Skill.findOne({
      where: { title: title.replace(/_/g, " "), workerId: workerId },
    });
    if (!skill) {
      return null;
    }

    return skill;
  }

  @Query(() => [Skill])
  async getSkillCount() {
    const count = await Skill.find({});
    return count;
  }

  @Query(() => [Skill])
  async searchSkills(
    @Arg("category", () => String) category: string | null,
    @Arg("city", () => String) city: string | null,
    @Arg("keyword", () => String) keyword: string | null,
    @Arg("orderBy", () => String) orderBy: string | null,
    @Arg("limit", () => Int) limit: number | undefined,
    @Arg("skip", () => Int) skip: number | undefined
  ): Promise<Skill[]> {
    let whereClause = "WHERE ";
    let orderClause = "ORDER BY ";

    const validCriterias = [
      { type: "keyword", value: keyword },
      { type: "category", value: category },
      { type: "zone", value: city },
    ].filter((e) => {
      return !(e.value == "");
    });
    let replacements: any[] = [];
    if (validCriterias.length == 1) {
      if (validCriterias[0].type == "keyword") {
        whereClause += `("description" LIKE $1  OR "title" LIKE $1 )`;
        replacements.push(`%${validCriterias[0].value}%`);
      } else {
        whereClause += `"${validCriterias[0].type}" = $1`;
        replacements.push(validCriterias[0].value);
      }
    } else if (validCriterias.length > 1) {
      if (validCriterias[0].type == "keyword") {
        whereClause += `("description" LIKE $1  OR "title" LIKE $1 )`;
        replacements.push(`%${validCriterias[0].value}%`);
        for (let i = 1; i < validCriterias.length; i++) {
          whereClause += ` AND "${validCriterias[i].type}" = $${i + 1} `;
          replacements.push(validCriterias[i].value);
        }
      } else {
        whereClause += `"${validCriterias[0].type}" = $1`;
        replacements.push(validCriterias[0].value);
        for (let i = 1; i < validCriterias.length; i++) {
          whereClause += ` AND "${validCriterias[i].type}" = $${i + 1} `;
          replacements.push(validCriterias[i].value);
        }
      }
    }
    whereClause += ` AND "status" = 'Finished'`;
    if (orderBy == "rating") {
      orderClause += `"rating" DESC`;
    } else if (orderBy == "delivery time") {
      orderClause += `"duration" ASC`;
    } else if (orderBy == "pricing") {
      orderClause += `"pricing" ASC`;
    }
    const query = `
    SELECT * from public.skill
    ${whereClause}
    ${orderClause}
  `;
    // console.log("query", query);
    // console.log("remplacemets", replacements);

    //rrr
    const skills = await getConnection().query(query, replacements);
    skills.forEach((skill: any) => {
      skill.pictures = skill.pictures.split(",");
    });

    return skills;

    // if (orderBy == "" || orderBy == "rating") {
    //   if (category == "" && (city == "" || city == "Everywhere")) {
    //     const skills = await Skill.find({
    //       where: [
    //         {
    //           description: Like(`%${keyword}%`),
    //           status: "Finished",
    //         },
    //         {
    //           title: Like(`%${keyword}%`),
    //           status: "Finished",
    //         },
    //       ],
    //       order: {
    //         rating: "DESC",
    //         id: "DESC",
    //       },
    //       take: limit,
    //       skip: skip,
    //     });
    //     return skills;
    //   }
    //   if (city == "" || city == "Everywhere") {
    //     const skills = await Skill.find({
    //       where: [
    //         {
    //           category: category,
    //           description: Like(`%${keyword}%`),
    //           status: "Finished",
    //         },
    //         {
    //           category: category,
    //           title: Like(`%${keyword}%`),
    //           status: "Finished",
    //         },
    //       ],
    //       order: {
    //         rating: "DESC",
    //         id: "DESC",
    //       },
    //       take: limit,
    //       skip: skip,
    //     });
    //     return skills;
    //   }
    //   if (category == "" && keyword == "") {
    //     const skills = await Skill.find({
    //       where: {
    //         zone: city,
    //         status: "Finished",
    //       },
    //       order: {
    //         rating: "DESC",
    //         id: "DESC",
    //       },
    //       take: limit,
    //       skip: skip,
    //     });
    //     return skills;
    //   }
    //   if (keyword == "") {
    //     const skills = await Skill.find({
    //       where: {
    //         category: category,
    //         zone: city,
    //         status: "Finished",
    //       },
    //       order: {
    //         rating: "DESC",
    //         id: "DESC",
    //       },
    //       take: limit,
    //       skip: skip,
    //     });
    //     return skills;
    //   }
    //   if ((city == "" || city == "Everywhere") && keyword == "") {
    //     const skills = await Skill.find({
    //       where: {
    //         category: category,
    //         status: "Finished",
    //       },
    //       order: {
    //         rating: "DESC",
    //         id: "DESC",
    //       },
    //       take: limit,
    //       skip: skip,
    //     });
    //     return skills;
    //   }
    //   if (category == "") {
    //     const skills = await Skill.find({
    //       where: [
    //         {
    //           zone: city,
    //           description: Like(`%${keyword}%`),
    //           status: "Finished",
    //         },
    //         {
    //           zone: city,
    //           title: Like(`%${keyword}%`),
    //           status: "Finished",
    //         },
    //       ],
    //       order: {
    //         rating: "DESC",
    //         id: "DESC",
    //       },
    //       take: limit,
    //       skip: skip,
    //     });
    //     return skills;
    //   }
    //   if (category !== "" && city !== "" && keyword !== "") {
    //     const skills = await Skill.find({
    //       where: [
    //         {
    //           category: category,
    //           zone: city,
    //           description: Like(`%${keyword}%`),
    //           status: "Finished",
    //         },
    //         {
    //           category: category,
    //           zone: city,
    //           title: Like(`%${keyword}%`),
    //           status: "Finished",
    //         },
    //       ],
    //       order: {
    //         rating: "DESC",
    //         id: "DESC",
    //       },
    //       take: limit,
    //       skip: skip,
    //     });
    //     return skills;
    //   }
    // } else if (orderBy == "pricing") {
    //   if (category == "" && (city == "" || city == "Everywhere")) {
    //     const skills = await Skill.find({
    //       where: [
    //         { description: Like(`%${keyword}%`), status: "Finished" },
    //         { title: Like(`%${keyword}%`), status: "Finished" },
    //       ],
    //       order: {
    //         pricing: "ASC",
    //         id: "DESC",
    //       },
    //       take: limit,
    //       skip: skip,
    //     });
    //     return skills;
    //   }
    //   if (city == "" || city == "Everywhere") {
    //     const skills = await Skill.find({
    //       where: [
    //         {
    //           category: category,
    //           description: Like(`%${keyword}%`),
    //           status: "Finished",
    //         },
    //         {
    //           category: category,
    //           title: Like(`%${keyword}%`),
    //           status: "Finished",
    //         },
    //       ],
    //       order: {
    //         pricing: "ASC",
    //         id: "DESC",
    //       },
    //       take: limit,
    //       skip: skip,
    //     });
    //     return skills;
    //   }
    //   if (category == "" && keyword == "") {
    //     const skills = await Skill.find({
    //       where: {
    //         category: city,
    //         status: "Finished",
    //       },
    //       order: {
    //         pricing: "ASC",
    //         id: "DESC",
    //       },
    //       take: limit,
    //       skip: skip,
    //     });
    //     return skills;
    //   }
    //   if (keyword == "") {
    //     const skills = await Skill.find({
    //       where: {
    //         category: category,
    //         zone: city,
    //         status: "Finished",
    //       },
    //       order: {
    //         pricing: "ASC",
    //         id: "DESC",
    //       },
    //       take: limit,
    //       skip: skip,
    //     });
    //     return skills;
    //   }
    //   if ((city == "" || city == "Everywhere") && keyword == "") {
    //     const skills = await Skill.find({
    //       where: {
    //         category: category,
    //         status: "Finished",
    //       },
    //       order: {
    //         pricing: "ASC",
    //         id: "DESC",
    //       },
    //       take: limit,
    //       skip: skip,
    //     });
    //     return skills;
    //   }
    //   if (category == "") {
    //     const skills = await Skill.find({
    //       where: [
    //         {
    //           zone: city,
    //           description: Like(`%${keyword}%`),
    //           status: "Finished",
    //         },
    //         {
    //           zone: city,
    //           title: Like(`%${keyword}%`),
    //           status: "Finished",
    //         },
    //       ],
    //       order: {
    //         pricing: "ASC",
    //         id: "DESC",
    //       },
    //       take: limit,
    //       skip: skip,
    //     });
    //     return skills;
    //   }
    //   if (category !== "" && city !== "" && keyword !== "") {
    //     const skills = await Skill.find({
    //       where: [
    //         {
    //           category: category,
    //           zone: city,
    //           description: Like(`%${keyword}%`),
    //           status: "Finished",
    //         },
    //         {
    //           category: category,
    //           zone: city,
    //           title: Like(`%${keyword}%`),
    //           status: "Finished",
    //         },
    //       ],
    //       order: {
    //         pricing: "ASC",
    //         id: "DESC",
    //       },
    //       take: limit,
    //       skip: skip,
    //     });
    //     return skills;
    //   }
    // } else if (orderBy == "delivery time") {
    //   if (category == "" && (city == "" || city == "Everywhere")) {
    //     const skills = await Skill.find({
    //       where: [
    //         {
    //           description: Like(`%${keyword}%`),
    //           status: "Finished",
    //         },
    //         {
    //           title: Like(`%${keyword}%`),
    //           status: "Finished",
    //         },
    //       ],
    //       order: {
    //         duration: "ASC",
    //         id: "DESC",
    //       },
    //       take: limit,
    //       skip: skip,
    //     });
    //     return skills;
    //   }
    //   if (city == "" || city == "Everywhere") {
    //     const skills = await Skill.find({
    //       where: [
    //         {
    //           category: category,
    //           description: Like(`%${keyword}%`),
    //           status: "Finished",
    //         },
    //         {
    //           category: category,
    //           title: Like(`%${keyword}%`),
    //           status: "Finished",
    //         },
    //       ],
    //       order: {
    //         duration: "ASC",
    //         id: "DESC",
    //       },
    //       take: limit,
    //       skip: skip,
    //     });
    //     return skills;
    //   }
    //   if (category == "" && keyword == "") {
    //     const skills = await Skill.find({
    //       where: {
    //         category: city,
    //         status: "Finished",
    //       },
    //       order: {
    //         duration: "ASC",
    //         id: "DESC",
    //       },
    //       take: limit,
    //       skip: skip,
    //     });
    //     return skills;
    //   }
    //   if (keyword == "") {
    //     const skills = await Skill.find({
    //       where: {
    //         category: category,
    //         zone: city,
    //         status: "Finished",
    //       },
    //       order: {
    //         duration: "ASC",
    //         id: "DESC",
    //       },
    //       take: limit,
    //       skip: skip,
    //     });
    //     return skills;
    //   }
    //   if ((city == "" || city == "Everywhere") && keyword == "") {
    //     const skills = await Skill.find({
    //       where: {
    //         category: category,
    //         status: "Finished",
    //       },
    //       order: {
    //         duration: "ASC",
    //         id: "DESC",
    //       },
    //       take: limit,
    //       skip: skip,
    //     });
    //     return skills;
    //   }
    //   if (category == "") {
    //     const skills = await Skill.find({
    //       where: [
    //         {
    //           zone: city,
    //           description: Like(`%${keyword}%`),
    //           status: "Finished",
    //         },
    //         {
    //           zone: city,
    //           title: Like(`%${keyword}%`),
    //           status: "Finished",
    //         },
    //       ],
    //       order: {
    //         duration: "ASC",
    //         id: "DESC",
    //       },
    //       take: limit,
    //       skip: skip,
    //     });
    //     return skills;
    //   }
    //   if (category !== "" && city !== "" && keyword !== "") {
    //     const skills = await Skill.find({
    //       where: [
    //         {
    //           category: category,
    //           zone: city,
    //           description: Like(`%${keyword}%`),
    //           status: "Finished",
    //         },
    //         {
    //           category: category,
    //           zone: city,
    //           title: Like(`%${keyword}%`),
    //           status: "Finished",
    //         },
    //       ],
    //       order: {
    //         duration: "ASC",
    //         id: "DESC",
    //       },
    //       take: limit,
    //       skip: skip,
    //     });
    //     return skills;
    //   }
    // }
    // if (
    //   keyword == "" &&
    //   (city == "" || city == "Everywhere") &&
    //   category == ""
    // ) {
    //   throw new Error("Select at least one criteria");
    // }

    // return [];
  }
}
