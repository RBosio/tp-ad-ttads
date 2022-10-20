import { Field, ObjectType } from "@nestjs/graphql";
import { Product } from "src/product/product.entity";
import { User } from "src/user/user.entity";
import { Order } from "../order.entity";
import { ProductResponse } from "./product-response";

@ObjectType()
export class OrderResponse {
  constructor(user: User, order: Order, products: ProductResponse[]) {
    this.user = user
    this.order = order
    this.products = products
  }

  @Field(() => User)
  user!: User

  @Field(() => Order)
  order!: Order

  @Field(() => [ProductResponse])
  products!: ProductResponse[]
}