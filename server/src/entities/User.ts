

import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Rating } from "./rating";


@ObjectType()
@Entity()
export class User extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  firstName!: string;

  @Field()
  @Column()
  lastName!: string;

  @Field()
  @Column({unique:true})
  email!: string;

  
  @Column()
  password!:string
  
  // @Field(type => [Rating],{defaultValue:[]})
  @OneToMany(() => Rating,rating => rating.user,{cascade:true})
  ratings: Rating[];


  @Field()
  @Column({default : false})
  isWorker! : boolean;

  // @Field({nullable:true})
  // @Column({nullable:true})
  // phone!: number;

  // @Field()
  // @Column()
  // city!: string;

  // @Column("int", {default:0})
  // tokenVersion: number;

  

  @Field()
  @CreateDateColumn()
  createdAt: Date ;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date ;
  

  

 
  

}

 



