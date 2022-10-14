import { Field, Float, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateCategoryInput {
  @Field(() => String, {nullable: true})
  name?: string
}