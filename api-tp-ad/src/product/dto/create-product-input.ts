import { Field, Float, InputType, Int } from "@nestjs/graphql";
import { IsAlpha, IsCurrency, MaxLength } from "class-validator";

@InputType()
export class CreateProductInput {
  @Field(() => String, {nullable: true})
  @MaxLength(20)
  name?: string

  @Field(() => Float, {nullable: true})
  @IsCurrency()
  price?: number

  @Field(() => Int, {nullable: true})
  @IsAlpha()
  stock?: number

  @Field(() => Int, {nullable: true})
  category?: number

  @Field(() => String, {nullable: true})
  image?: string
}