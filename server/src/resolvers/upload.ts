import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "../utils/s3";
import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Resolver,
} from "type-graphql";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { MyContext } from "src/types";
import { Worker } from "../entities/worker";
import { Skill } from "../entities/skill";
import { User } from "../entities/user";

const bucketName = process.env.AWS_BUCKET_NAME as string;

@ObjectType()
class S3SignResponse {
  @Field(() => String, {
    nullable: true,
  })
  signedS3Url?: string;

  @Field(() => String, {
    nullable: true,
  })
  objectUrl?: string;

  @Field(() => String, {
    nullable: true,
  })
  error?: string;
}

@Resolver()
export class UploadResolver {
  @Mutation(() => S3SignResponse)
  async uploadProfilePicture(
    @Arg("fileName", () => String) fileName: string,
    @Arg("fileType", () => String) fileType: string,
    @Ctx() { req }: MyContext
  ) {
    const user = await User.findOne({
      id: req.session.userId,
    });
    if (!user) {
      return {
        error: "Not authenticated",
      };
    }
    const s3Params = {
      Bucket: bucketName,
      Key: `profilepic/${fileName}`,
      contentType: fileType,
    };

    await s3.send(new PutObjectCommand(s3Params));

    const signedS3Url = await getSignedUrl(s3, new PutObjectCommand(s3Params), {
      expiresIn: 50000,
    });

    const objectUrl = `https://${bucketName}.s3.amazonaws.com/profilepic/${fileName}`;

    return {
      error: null,
      signedS3Url: signedS3Url,
      objectUrl: objectUrl,
    };
  }
  @Mutation(() => Boolean)
  async addProfilePicture(
    @Arg("pictureUrl", () => String) pictureUrl: string,
    // @Arg("workerId", () => String) workerId:string,
    @Ctx() { req }: MyContext
  ) {
    const user = await User.findOne({
      id: req.session.userId,
    });
    if (!user) {
      return false;
    }
    if (user.isWorker) {
      user.profilePicture = pictureUrl;
      await Worker.update(
        { id: req.session.userId },
        { profilePicture: pictureUrl }
      );
      await User.save(user);
      return true;
    } else {
      user.profilePicture = pictureUrl;
      await User.save(user);
      return true;
    }
  }

  @Mutation(() => Boolean)
  async deleteProfilePicture(@Ctx() { req }: MyContext) {
    const user = await User.findOne({ id: req.session.userId });

    if (!user) {
      return false;
    }

    const s3Params = {
      Bucket: bucketName,
      Key: `${user.profilePicture.split(".com/")[1]}`,
    };
    await s3.send(new DeleteObjectCommand(s3Params));

    if (user.isWorker) {
      user.profilePicture = "";
      await User.save(user);
      await Worker.update({ id: req.session.userId }, { profilePicture: "" });
      return true;
    } else {
      user.profilePicture = "";
      await User.save(user);
      return true;
    }
  }

  @Mutation(() => S3SignResponse)
  async uploadPicture(
    @Arg("fileName", () => String) fileName: string,
    @Arg("fileType", () => String) fileType: string,
    @Arg("skillId", () => String) skillId: string,
    @Ctx() { req }: MyContext
  ) {
    const worker = await Worker.findOne({
      id: req.session.userId,
    });
    const skill = await Skill.findOne({ id: skillId });
    if (!skill) {
      return {
        error: "Skill not found",
      };
    }
    if (!worker) {
      return {
        error: "Not authenticated",
      };
    }
    if (skill.workerId != req.session.userId) {
      return {
        error: "You don't have permissions for this action",
      };
    }
    if (skill.pictures?.length > 4) {
      return {
        error: "you can't upload more than 4 pictures",
      };
    }
    const s3Params = {
      Bucket: bucketName,
      Key: `publicPics/${fileName}`,
      contentType: fileType,
    };

    await s3.send(new PutObjectCommand(s3Params));

    const signedS3Url = await getSignedUrl(s3, new PutObjectCommand(s3Params), {
      expiresIn: 5000,
    });

    const objectUrl = `https://${bucketName}.s3.amazonaws.com/publicPics/${fileName}`;

    return {
      error: null,
      signedS3Url: signedS3Url,
      objectUrl: objectUrl,
    };
  }

  @Mutation(() => Boolean)
  async addPicture(
    @Arg("pictureUrl", () => String) pictureUrl: string,
    @Arg("skillId", () => String) skillId: string,
    @Arg("index", () => Int) index: number,
    @Ctx() { req }: MyContext
  ) {
    const worker = await Worker.findOne({
      id: req.session.userId,
    });
    const skill = await Skill.findOne({ id: skillId });

    if (!worker) {
      return false;
    }
    if (!skill) {
      return false;
    }

    skill.pictures[index] = pictureUrl;

    await Skill.save(skill);
    return true;
  }

  @Mutation(() => Boolean)
  async deletePicture(
    @Arg("index", () => Int) index: number,
    @Arg("skillId", () => String) skillId: string,
    @Ctx() { req }: MyContext
  ) {
    const worker = await Worker.findOne({
      id: req.session.userId,
    });
    const skill = await Skill.findOne({ id: skillId });

    if (!worker) {
      return false;
    }
    if (!skill) {
      return false;
    }

    const s3Params = {
      Bucket: bucketName,
      Key: `${skill.pictures[index].split(".com/")[1]}`,
    };
    await s3.send(new DeleteObjectCommand(s3Params));

    skill.pictures[index] = "";

    await Skill.save(skill);
    return true;
  }
}
