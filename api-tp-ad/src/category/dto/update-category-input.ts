import { Field, Float, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateCategoryInput {
  @Field(() => Int, {nullable: true})
  id?: number
  
  @Field(() => String, {nullable: true})
  name?: string
}