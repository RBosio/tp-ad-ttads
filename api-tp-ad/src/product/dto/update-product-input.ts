import { Field, Float, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateProductInput {
  @Field(() => Int, {nullable: true})
  id?: number
  
  @Field(() => String, {nullable: true})
  name?: string

  @Field(() => Float, {nullable: true})
  price?: number

  @Field(() => Int, {nullable: true})
  stock?: number

  @Field(() => Int, {nullable: true})
  category?: number

  @Field(() => String, {nullable: true})
  image?: string
}