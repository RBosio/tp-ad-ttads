import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, MaxLength } from "class-validator";

@InputType()
export class CreateUserInput {
  @Field(() => String, {nullable: true})
  @MaxLength(20)
  name?: string
  
  @Field(() => String, {nullable: true})
  @MaxLength(20)
  surname?: string
  
  @Field(() => String, {nullable: true})
  @IsEmail()
  email?: string
  
  @Field(() => String, {nullable: true})
  password?: string
}