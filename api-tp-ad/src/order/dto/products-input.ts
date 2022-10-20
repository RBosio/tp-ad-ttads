import { Field, InputType, Int, PartialType } from "@nestjs/graphql";
import { UpdateProductInput } from "src/product/dto/update-product-input";

@InputType()
export class ProductsInput {
  @Field(() => Int)
  id!: number

  @Field(() => Int)
  quantity!: number
}