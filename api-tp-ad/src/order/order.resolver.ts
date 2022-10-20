import { Inject, UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateOrderInput } from './dto/create-order-input';
import { OrderResponse } from './dto/order-response';
import { OrderProduct } from './order-product.entity';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Resolver()
export class OrderResolver {
  constructor(@Inject(OrderService) private orderService: OrderService) {}

  @Query(() => [Order])
  @UseGuards(JwtAuthGuard)
  async getOrders(): Promise<Order[]> {
    return this.orderService.findAll()
  }
  
  @Query(() => OrderResponse)
  @UseGuards(JwtAuthGuard)
  async getOrder(
    @Args('id', {type: () => Int}) id: number
  ): Promise<OrderResponse> {
    return this.orderService.findOne(id)
  }

  @Mutation(() => Order)
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Args('createOrderInput', {type: () => CreateOrderInput}) createOrderInput: CreateOrderInput
  ): Promise<Order> {
    return this.orderService.create(createOrderInput)
  }
  
  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async deleteOrder(
    @Args('id', {type: () => Int}) id: number
  ): Promise<string> {
    return this.orderService.delete(id)
  }
}
