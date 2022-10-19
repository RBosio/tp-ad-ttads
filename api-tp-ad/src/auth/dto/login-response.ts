import { Field, Int, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/user.entity";

@ObjectType()
export class LoginResponse {
  @Field(() => String)
  token!: string
  
  @Field(() => User)
  user!: User
}