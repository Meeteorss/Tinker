import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Skill extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  workerId!: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  worker: string;

  @Field()
  @Column()
  rating!: number;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  ratingsNumber: number;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  workerPicUrl: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  category!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  title!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description!: string;

  @Field(() => Int, { nullable: true })
  @Column({ type: "int", nullable: true })
  pricing!: number;

  @Field(() => Int)
  @Column({ type: "int", default: 32 * 24 })
  duration: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  zone: string;

  @Field()
  @Column()
  status!: string;

  @Field(() => [String], { nullable: true })
  @Column("simple-array", { nullable: true })
  pictures: string[];

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true, default: 0 })
  likesCount: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
