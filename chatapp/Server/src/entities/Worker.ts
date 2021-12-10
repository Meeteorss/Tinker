import { Field, Int, ObjectType } from "type-graphql";
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
import { Skill } from "./skill";

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
  Barber = "Barber",
  Tailor = "Tailor",
  Photographer = "Photographer",
  Carpenter = "Carpenter",
  BlackSmith = "BlackSmith",
  Painter = "Painter",
  plasterer = "plasterer",
  Driver = "Driver",
  Housemaid = "Housemaid",
  Tutor = "Tutor",
  Coach = "Coach",
}

export enum CityChoices {
  Everywhere = "Everywhere",
  Marrakech = "Marrakech",
  Casablanca = "Casablanca",
  Tangier = "Tangier",
  Agadir = "Agadir",
  Rabat = "Rabat",
  Fez = "Fez",
  Salé = "Salé",
  Meknes = "Meknes",
  Oujda = "Oujda",
  Kenitra = "Kenitra",
  Tetouan = "Tetouan",
  Temara = "Temara",
  Safi = "Safi",
  Mohammedia = "Mohammedia",
  Khouribga = "Khouribga",
  El_Jadida = "El Jadida",
  Beni_Mellal = "Beni Mellal",
  Nador = "Nador",
  Settat = "Settat",
  Taza = "Taza",
  Berrechid = "Berrechid",
  Khmisset = "Khmisset",
  Guelmim = "Guelmim",
  Larache = "Larache",
  Khenifra = "Khenifra",
  Ben_guerir = "Ben guerir",
  Essaouira = "Essaouira",
  Ouarzazate = "Ouarzazate",
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
  @Column()
  userName!: string;

  @Field(() => String)
  fullName: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Field()
  @Column()
  sexe!: string;

  @Field()
  @Column()
  phone!: string;

  @Field()
  @Column()
  city!: string;

  @Field()
  @Column()
  dateOfBirth!: Date;

  @Field(() => Int)
  age: number;

  @Field()
  @Column()
  description!: string;

  @Field(() => [String], { nullable: true })
  @Column("simple-array", { nullable: true })
  skillsIds: string[];

  @Field(() => [Skill])
  skills: Skill[];

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  favsCount: number;

  @Field({ defaultValue: true })
  @Column({ default: true })
  isActive!: Boolean;

  @Field(() => [Rating])
  @OneToMany(() => Rating, (rating) => rating.worker)
  ratings: Rating[];

  @Field()
  @Column("int", { default: 0 })
  ratingsValue: number;

  @Field()
  @Column("int", { default: 0 })
  ratingsNumber: number;

  @Field()
  @Column("float", { default: 0 })
  rating: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  profilePicture: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
