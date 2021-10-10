// import { Secret, sign } from "jsonwebtoken";
// import { User } from "src/entities/user";

// export const createAccessToken = (user: User) => {
//     return sign({userId: user.id},process.env.ACCESS_TOKEN_SECRET as Secret,
//     {
//         expiresIn:"15m"
//     });
// }

// export const createRefreshToken = (user: User) => {
//     return sign({userId: user.id, tokenVersion: user.tokenVersion},process.env.REFRESH_TOKEN_SECRET as Secret,{
//         expiresIn:"7d"
//     });
// }