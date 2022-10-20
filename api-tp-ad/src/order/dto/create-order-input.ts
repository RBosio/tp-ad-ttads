import { Field, InputType } from "@nestjs/graphql";
import { ProductsInput } from "./products-input";
import { UserInput } from "./user-input";

@InputType()
export class CreateOrderInput {
  @Field(() => [ProductsInput])
  orderProducts!: ProductsInput[]
  
  @Field(() => UserInput)
  user!: UserInput
}