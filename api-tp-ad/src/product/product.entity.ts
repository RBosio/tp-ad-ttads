import { Field, Float, ID, Int, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @Column({length: 20})
  name!: string

  @Field(() => Float)
  @Column('decimal', {precision: 6, scale: 2})
  price!: number

  @Field(() => Int)
  @Column()
  stock!: number

  @Field(() => Date)
  @CreateDateColumn()
  created_at!: Date

  @Field(() => String, {nullable: true})
  @Column({length: 100, nullable: true})
  image!: string

  @Field(() => Boolean)
  @Column({default: true})
  status!: boolean
}