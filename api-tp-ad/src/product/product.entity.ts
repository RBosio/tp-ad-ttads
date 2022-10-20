import { Field, Float, ID, Int, ObjectType } from "@nestjs/graphql";
import { Category } from "src/category/category.entity";
import { OrderProduct } from "src/order/order-product.entity";
import { Order } from "src/order/order.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Product {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number

  @Field(() => String)
  @Column({length: 20})
  name!: string

  @Field(() => Float)
  @Column('decimal', {precision: 6, scale: 2})
  price!: number

  @Field(() => Int)
  @Column()
  stock!: number

  @Field(() => Date)
  @CreateDateColumn()
  created_at!: Date

  @Field(() => String, {nullable: true})
  @Column({length: 100, nullable: true})
  image!: string

  @Field(() => Category)
  @ManyToOne(() => Category, category => category.id, {
    cascade: true,
    nullable: false
  })
  @JoinColumn({name: 'categoryId'})
  category!: number

  @Field(() => [OrderProduct])
  @OneToMany(() => OrderProduct, (orderProduct)=> orderProduct.order)
  orderProducts!: OrderProduct[]
  
  @Field(() => Boolean)
  @Column({default: true})
  status!: boolean
}