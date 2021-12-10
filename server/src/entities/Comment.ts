import { Field, ObjectType } from "type-graphql";
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
export class Comment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  content!: string;

  @Field()
  @Column()
  userId!: string;

  @Field()
  @Column()
  skillId!: string;

  @Field()
  @Column()
  author!: string;

  @Field()
  @Column()
  workerId!: string;

  @Field()
  @Column()
  worker!: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
