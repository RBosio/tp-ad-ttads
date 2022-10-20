import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { UpdateUserInput } from "src/user/dto/update-user-input";

@InputType()
export class UserInput {
  @Field(() => Int)
  id!: number
}