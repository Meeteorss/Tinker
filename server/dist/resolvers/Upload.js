"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadResolver = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_1 = require("../utils/s3");
const type_graphql_1 = require("type-graphql");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const worker_1 = require("../entities/worker");
const skill_1 = require("../entities/skill");
const user_1 = require("../entities/user");
const bucketName = process.env.AWS_BUCKET_NAME;
let S3SignResponse = class S3SignResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => String, {
        nullable: true,
    }),
    __metadata("design:type", String)
], S3SignResponse.prototype, "signedS3Url", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, {
        nullable: true,
    }),
    __metadata("design:type", String)
], S3SignResponse.prototype, "objectUrl", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String, {
        nullable: true,
    }),
    __metadata("design:type", String)
], S3SignResponse.prototype, "error", void 0);
S3SignResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], S3SignResponse);
let UploadResolver = class UploadResolver {
    async uploadProfilePicture(fileName, fileType, { req }) {
        const user = await user_1.User.findOne({
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
        await s3_1.s3.send(new client_s3_1.PutObjectCommand(s3Params));
        const signedS3Url = await (0, s3_request_presigner_1.getSignedUrl)(s3_1.s3, new client_s3_1.PutObjectCommand(s3Params), {
            expiresIn: 50000,
        });
        const objectUrl = `https://${bucketName}.s3.amazonaws.com/profilepic/${fileName}`;
        return {
            error: null,
            signedS3Url: signedS3Url,
            objectUrl: objectUrl,
        };
    }
    async addProfilePicture(pictureUrl, { req }) {
        const user = await user_1.User.findOne({
            id: req.session.userId,
        });
        if (!user) {
            return false;
        }
        if (user.isWorker) {
            user.profilePicture = pictureUrl;
            await worker_1.Worker.update({ id: req.session.userId }, { profilePicture: pictureUrl });
            await user_1.User.save(user);
            return true;
        }
        else {
            user.profilePicture = pictureUrl;
            await user_1.User.save(user);
            return true;
        }
    }
    async deleteProfilePicture({ req }) {
        const user = await user_1.User.findOne({ id: req.session.userId });
        if (!user) {
            return false;
        }
        const s3Params = {
            Bucket: bucketName,
            Key: `${user.profilePicture.split(".com/")[1]}`,
        };
        await s3_1.s3.send(new client_s3_1.DeleteObjectCommand(s3Params));
        if (user.isWorker) {
            user.profilePicture = "";
            await user_1.User.save(user);
            await worker_1.Worker.update({ id: req.session.userId }, { profilePicture: "" });
            return true;
        }
        else {
            user.profilePicture = "";
            await user_1.User.save(user);
            return true;
        }
    }
    async uploadPicture(fileName, fileType, skillId, { req }) {
        var _a;
        const worker = await worker_1.Worker.findOne({
            id: req.session.userId,
        });
        const skill = await skill_1.Skill.findOne({ id: skillId });
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
        if (((_a = skill.pictures) === null || _a === void 0 ? void 0 : _a.length) > 4) {
            return {
                error: "you can't upload more than 4 pictures",
            };
        }
        const s3Params = {
            Bucket: bucketName,
            Key: `publicPics/${fileName}`,
            contentType: fileType,
        };
        await s3_1.s3.send(new client_s3_1.PutObjectCommand(s3Params));
        const signedS3Url = await (0, s3_request_presigner_1.getSignedUrl)(s3_1.s3, new client_s3_1.PutObjectCommand(s3Params), {
            expiresIn: 5000,
        });
        const objectUrl = `https://${bucketName}.s3.amazonaws.com/publicPics/${fileName}`;
        return {
            error: null,
            signedS3Url: signedS3Url,
            objectUrl: objectUrl,
        };
    }
    async addPicture(pictureUrl, skillId, index, { req }) {
        const worker = await worker_1.Worker.findOne({
            id: req.session.userId,
        });
        const skill = await skill_1.Skill.findOne({ id: skillId });
        if (!worker) {
            return false;
        }
        if (!skill) {
            return false;
        }
        skill.pictures[index] = pictureUrl;
        await skill_1.Skill.save(skill);
        return true;
    }
    async deletePicture(index, skillId, { req }) {
        const worker = await worker_1.Worker.findOne({
            id: req.session.userId,
        });
        const skill = await skill_1.Skill.findOne({ id: skillId });
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
        await s3_1.s3.send(new client_s3_1.DeleteObjectCommand(s3Params));
        skill.pictures[index] = "";
        await skill_1.Skill.save(skill);
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => S3SignResponse),
    __param(0, (0, type_graphql_1.Arg)("fileName", () => String)),
    __param(1, (0, type_graphql_1.Arg)("fileType", () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UploadResolver.prototype, "uploadProfilePicture", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("pictureUrl", () => String)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UploadResolver.prototype, "addProfilePicture", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadResolver.prototype, "deleteProfilePicture", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => S3SignResponse),
    __param(0, (0, type_graphql_1.Arg)("fileName", () => String)),
    __param(1, (0, type_graphql_1.Arg)("fileType", () => String)),
    __param(2, (0, type_graphql_1.Arg)("skillId", () => String)),
    __param(3, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], UploadResolver.prototype, "uploadPicture", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("pictureUrl", () => String)),
    __param(1, (0, type_graphql_1.Arg)("skillId", () => String)),
    __param(2, (0, type_graphql_1.Arg)("index", () => type_graphql_1.Int)),
    __param(3, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Object]),
    __metadata("design:returntype", Promise)
], UploadResolver.prototype, "addPicture", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("index", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)("skillId", () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, Object]),
    __metadata("design:returntype", Promise)
], UploadResolver.prototype, "deletePicture", null);
UploadResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UploadResolver);
exports.UploadResolver = UploadResolver;
//# sourceMappingURL=Upload.js.map