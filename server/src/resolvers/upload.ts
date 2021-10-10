import { PutObjectCommand } from "@aws-sdk/client-s3";
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
    const worker = await Worker.findOne({
      id: req.session.userId,
    });
    if (!worker) {
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
    const worker = await Worker.findOne({
      id: req.session.userId,
    });
    if (!worker) {
      return false;
    }
    worker.profilePicture = pictureUrl;
    await Worker.save(worker);
    return true;
  }

  @Mutation(() => S3SignResponse)
  async uploadPicture(
    @Arg("fileName", () => String) fileName: string,
    @Arg("fileType", () => String) fileType: string,
    @Ctx() { req }: MyContext
  ) {
    const worker = await Worker.findOne({
      id: req.session.userId,
    });
    if (!worker) {
      return {
        error: "Not authenticated",
      };
    } else if (worker.pictures?.length > 4) {
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
      expiresIn: 50000,
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
    @Arg("index", () => Int) index: number,
    @Ctx() { req }: MyContext
  ) {
    const worker = await Worker.findOne({
      id: req.session.userId,
    });

    if (!worker) {
      return false;
    }

    worker.pictures[index] = pictureUrl;

    await Worker.save(worker);
    return true;
  }

  @Mutation(() => Boolean)
  async deletePicture(
    @Arg("index", () => Int) index: number,
    @Ctx() { req }: MyContext
  ) {
    const worker = await Worker.findOne({
      id: req.session.userId,
    });

    if (!worker) {
      return false;
    }

    worker.pictures[index] = "";
    worker.pictures.splice(4, 1);

    await Worker.save(worker);
    return true;
  }
}
