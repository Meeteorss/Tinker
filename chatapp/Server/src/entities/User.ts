import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
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
  @Column({ unique: true })
  userName!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({ nullable: true, default: "" })
  @Field({ nullable: true })
  profilePicture: string;

  @OneToMany(() => Rating, (rating) => rating.user, { cascade: true })
  ratings: Rating[];

  @Field()
  @Column({ default: false })
  isWorker!: boolean;

  @Field()
  @Column({ default: false })
  confirmed: boolean;

  @Field(() => [String], { nullable: true })
  @Column("simple-array", { nullable: true })
  likesIds: string[];

  @Field(() => [String], { nullable: true })
  @Column("simple-array", { nullable: true })
  favoritesIds: string[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
