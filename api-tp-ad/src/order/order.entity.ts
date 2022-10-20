import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Product } from "src/product/product.entity";
import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderProduct } from "./order-product.entity";

@ObjectType()
@Entity('orders')
export class Order {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number
  
  @Field(() => [Order])
  @OneToMany(() => OrderProduct, (orderProduct)=> orderProduct.product)
  orderProducts!: OrderProduct[]
  
  @Field(() => User)
  @ManyToOne(() => User, user => user.id, {
    cascade: true,
    nullable: false
  })
  @JoinColumn({name: 'userId'})
  user?: User

  @Column()
  userId!: number

  @Field(() => Date)
  @CreateDateColumn()
  created_at!: Date

  @Field(() => Boolean)
  @Column({default: true})
  status!: boolean
}