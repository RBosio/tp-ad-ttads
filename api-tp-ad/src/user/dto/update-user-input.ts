import { Field, Float, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateUserInput {
  @Field(() => Int, {nullable: true})
  id?: number
  
  @Field(() => String, {nullable: true})
  name?: string
  
  @Field(() => String, {nullable: true})
  surname?: string
  
  @Field(() => String, {nullable: true})
  email?: string
  
  @Field(() => String, {nullable: true})
  password?: string
}