import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @Column({length: 20})
  name!: string
  
  @Field(() => String)
  @Column({length: 20})
  surname!: string
  
  @Field(() => String)
  @Column({length: 50, unique: true})
  email!: string
  
  @Field(() => String)
  @Column({length: 100})
  password?: string

  @Field(() => Date)
  @CreateDateColumn()
  created_at!: Date

  @Field(() => Boolean)
  @Column({default: true})
  status!: boolean
}