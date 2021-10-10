//import { MyContext } from "src/types";
import "reflect-metadata";
import {
    User
} from "../entities/user";
import {
    Arg,
    Ctx,
    Field,
    InputType,
    
    Mutation,
    ObjectType,
    Query,
    Resolver,

} from "type-graphql";
import argon2 from "argon2";
import {
    getConnection
} from "typeorm";

import {
    MyContext
} from "src/types";
import {
    COOKIE_NAME,
    ___prod___
} from "../constants";
import { validateRegister } from "../utils/validateRegister";
// import { createAccessToken, createRefreshToken } from "../utils/createTokens";
// import {
//     isAuth
// } from "../utils/isAuth";









@ObjectType()
export class ErrorField {
    @Field()
    field: string;
    @Field()
    message: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [ErrorField], {
        nullable: true
    })
    errors ? : ErrorField[]
    @Field(() => User, {
        nullable: true
    })
    user ? : User

}


@InputType()
export class RegisterInput {
    @Field()
    firstName: string

    @Field()
    lastName: string

    @Field()
    email: string

    @Field()
    password: string


}

@InputType()
export class LoginInput {
    @Field()
    email: string
    @Field()
    password: string

}


@Resolver(User)
export class UserResolver {


    @Query(() => [User])
    async users(): Promise < User[] > {
        const users = await getConnection().getRepository(User).createQueryBuilder("user").getMany();
        return users
        // return await User.find();      
    }



    @Query(() => User, {
        nullable: true
    })
    async me(
        @Ctx() {
            req
        }: MyContext
    ) {
        if (!req.session.userId) {
            
            return null;
        }
        const user = await User.findOne({
            id: req.session.userId
        })
        

        return user;
    }




    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: RegisterInput,
        @Ctx() {
            req
        }: MyContext
    ): Promise < UserResponse > {

        const errors = validateRegister(options);
        if(errors){
            return {errors};
        }

        const hashedPassword = await argon2.hash(options.password)
        const user = User.create({
            firstName: options.firstName,
            lastName: options.lastName,

            email: options.email,
            password: hashedPassword,

        })
        try {
            await User.save(user);
        } catch (err) {
            if (err.code === '23505' || err.detail.includes("already exists")) {
                return {
                    errors: [{
                        field: "email",
                        message: "Email already used"
                    }]
                }
            }

        }

        req.session.userId = user.id;
        return {
            user
        };
    }





    @Mutation(() => UserResponse)
    async login(
        @Arg('options') options: LoginInput,
        @Ctx() {
            req
        }: MyContext
    ): Promise < UserResponse > {
        const user = await User.findOne({
            email: options.email
        });

        if (!user) {
            return {
                errors: [{
                    field: 'email',
                    message: "email doesn't exist"
                }, ],
            };
        }
        const validPassword = await argon2.verify(user.password, options.password)
        if (!validPassword) {
            return {
                errors: [{
                    field: 'password',
                    message: "Password incorrect"
                }, ],
            };
        }

        req.session.userId = user.id;
        

        return {

            user: user
        }

    }

    @Mutation(() => Boolean)
    logout(@Ctx(){req,res}: MyContext){
        return new Promise((resolve) => 
        req.session.destroy((err) => {
            res.clearCookie(COOKIE_NAME)
            if(err) {
                console.log(err);
                resolve(false);
                return;
            }
            resolve(true)
        }))
    }

   





}