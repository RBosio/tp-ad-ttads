import { Field, InputType } from "@nestjs/graphql";
import { MaxLength } from "class-validator";

@InputType()
export class CreateCategoryInput {
  @Field(() => String, {nullable: true})
  @MaxLength(20)
  name?: string
}