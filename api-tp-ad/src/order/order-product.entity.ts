import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Product } from "src/product/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@ObjectType()
@Entity('order_product')
export class OrderProduct {
  constructor(order: Order, productId: number, quantity: number) {
    this.order = order
    this.productId = productId
    this.quantity = quantity
  }

  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => Order)
  @ManyToOne(() => Order, (order)=> order.orderProducts)
  @JoinColumn({name: 'orderId'})
  order?: Order

  @Column()
  orderId!: number
  
  @Field(() => Product)
  @ManyToOne(() => Product, (product)=> product.orderProducts)
  @JoinColumn({name: 'productId'})
  product!: Product
  
  @Column()
  productId!: number
  
  @Field(() => Int)
  @Column()
  quantity!: number
}