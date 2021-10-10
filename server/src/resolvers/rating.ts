
import { Rating } from "../entities/rating";
import { MyContext } from "src/types";
import {  Arg, Ctx, Int, Mutation, registerEnumType, Resolver } from "type-graphql";

import {
    Worker
} from "../entities/worker";




enum RatingValues{
    one = 1,
    two = 2,
    three = 3,
    four = 4, 
    five = 5,
}
registerEnumType(RatingValues,{name:"RatingValues",description:"Values that a rating can take"})


@Resolver(Rating)
export class RatingResolver{

    @Mutation(() => Rating || null)
    async rate(
        @Arg("workerId", () => String) workerId: string,
        @Arg("value",() =>Int) value:RatingValues,
        @Arg("userId", () => String) userId: string,
        @Ctx() {req}: MyContext
    ){
        
        const rating = Rating.create({userId,workerId,value})
        await Rating.insert(rating)
        console.log(rating)
        
        const worker = await Worker.findOne({
            id:workerId
         })
        if(!worker){
            return null
        }

        worker.ratingsValue += value;
        worker.ratingsNumber ++;
        worker.rating = worker.ratingsValue/worker.ratingsNumber
        await Worker.save(worker)
      
        if(!rating){
            return null
        }
        return rating
    }
  
    
}