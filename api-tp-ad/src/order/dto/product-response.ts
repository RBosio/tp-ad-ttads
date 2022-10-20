import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Product } from "src/product/product.entity";
import { User } from "src/user/user.entity";
import { Order } from "../order.entity";

@ObjectType()
export class ProductResponse {
  @Field(() => Int)
  id!: number

  @Field(() => String)
  name!: string

  @Field(() => Int)
  price!: number

  @Field(() => Int)
  quantity!: number
}