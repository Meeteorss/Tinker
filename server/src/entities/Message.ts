import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum RemovedBy {
  SENDER = "sender",
  RECIEVER = "reciever",
  BOTH = "both",
  NONE = "none",
}

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  senderId!: string;

  @Field()
  @Column()
  recieverId!: string;

  @Field()
  @Column()
  sender: string;

  @Field()
  @Column()
  reciever: string;

  @Field()
  @Column()
  content: string;

  @Field()
  @Column({ type: "enum", enum: RemovedBy, default: RemovedBy.NONE })
  state: RemovedBy;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
