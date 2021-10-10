import { S3Client } from "@aws-sdk/client-s3";


const region = process.env.AWS_BUCKET_REGION as string
const accessKeyId = process.env.AWS_ACCESS_KEY as string
const secretAccessKey = process.env.AWS_SECRET_KEY as string
export const s3 = new S3Client({
    region:region,
    credentials:{
        accessKeyId:accessKeyId,
        secretAccessKey:secretAccessKey
    }
})