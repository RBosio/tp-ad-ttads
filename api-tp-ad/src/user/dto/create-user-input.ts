import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUserInput {
  @Field(() => String)
  name!: string
  
  @Field(() => String)
  surname!: string
  
  @Field(() => String)
  email!: string
  
  @Field(() => String)
  password!: string
}