import { Field, Float, InputType, Int, PartialType } from "@nestjs/graphql";
import { CreateProductInput } from "./create-product-input";

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput){
  @Field(() => Int, {nullable: true})
  id?: number
}