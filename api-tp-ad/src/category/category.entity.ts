import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Category {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @Column({length: 20})
  name!: string

  @Field(() => Date)
  @CreateDateColumn()
  created_at!: Date

  @Field(() => Boolean)
  @Column({default: true})
  status!: boolean
}