import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user";
import { Worker } from "./worker";



@ObjectType()
@Entity()
export class Rating extends BaseEntity {

  // @Field()
  // @PrimaryGeneratedColumn("uuid")
  // id!: string;

  @Field()
  @Column({type:"int"})
  value:number

  @Field()
  @PrimaryColumn()
  userId:string
    
  // @Field(type => User)
  @ManyToOne(() => User, user => user.ratings,{cascade:["update","insert"]})
  user: User;

  @Field()
  @PrimaryColumn()
  workerId:string
    
  // @Field(type => Worker)
  @ManyToOne(() => Worker, (worker) => worker.ratings)
  worker: Worker;

  @CreateDateColumn()
  createdAt: Date ;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date ;
}