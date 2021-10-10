import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Rating } from "./rating";

export enum Duration {
  Hour,
  Day,
  Week,
  Mounth,
  Task,
}

export enum JobCategory {
  Developper = "Developper",
  Editor = "Editor",
  Chef = "Chef",
  Plumber = "Plumber",
  Electrician = "Electrician",
}

@ObjectType()
@Entity()
export class Worker extends BaseEntity {
  @Field()
  @PrimaryColumn("uuid", { unique: true })
  id!: string;

  @Field()
  @Column()
  firstName!: string;

  @Field()
  @Column()
  lastName!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field()
  @Column()
  phone!: string;

  @Field()
  @Column()
  city!: string;

  @Field()
  @Column()
  job!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  title!: string;

  @Field()
  @Column()
  jobDescription!: String;

  @Field({ nullable: true })
  @Column({ type: "int", nullable: true })
  price!: number;

  @Field()
  @Column()
  duration!: string;

  @Field({ defaultValue: true })
  @Column({ default: true })
  isActive!: Boolean;

  @Field((type) => [Rating])
  @OneToMany(() => Rating, (rating) => rating.worker)
  ratings: Rating[];

  @Field({ nullable: true })
  @Column("int", { nullable: true })
  ratingsValue: number;

  @Field({ nullable: true })
  @Column("int", { nullable: true })
  ratingsNumber: number;

  @Field({ nullable: true })
  @Column("float", { nullable: true, default: 0 })
  rating: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  profilePicture: string;

  @Field(() => [String], { nullable: true })
  @Column("simple-array", { nullable: true, default: ["", "", "", ""] })
  pictures: string[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
