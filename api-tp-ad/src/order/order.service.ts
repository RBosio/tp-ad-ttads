import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/product/product.entity';
import { ProductService } from 'src/product/product.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateOrderInput } from './dto/create-order-input';
import { OrderResponse } from './dto/order-response';
import { ProductResponse } from './dto/product-response';
import { OrderProduct } from './order-product.entity';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderProduct) private orderProductRepository: Repository<OrderProduct>,
    private userService: UserService,
    private productService: ProductService) {}

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: {
        user: true,
      }
    })
  }
  
  async findOne(id: number): Promise<OrderResponse> {
    const orderProduct = await this.orderProductRepository.find({
      relations: {
        order: true,
        product: true
      },
      where: {
        orderId: id
      }
    })

    const order = orderProduct[0].order
    const user = await this.userService.findOne(order.userId)
    
    let products: ProductResponse[] = []

    for (const {productId, quantity} of orderProduct) {
      const {id, name, price} = await this.productService.findOne(productId)

      const productResponse = new ProductResponse()
      productResponse.id = id
      productResponse.name = name
      productResponse.price = price
      productResponse.quantity = quantity
      
      products.push(productResponse)
    }

    const orderResponse = new OrderResponse(user, order, products)

    return orderResponse
  }

  async create(createOrderInput: CreateOrderInput): Promise<Order> {
    let order = new Order()
    order.userId = createOrderInput.user.id

    await this.orderRepository.save(order)

    for (const product of createOrderInput.orderProducts) {
      const orderProduct = new OrderProduct(order, product.id, product.quantity)
      await this.orderProductRepository.save(orderProduct)
    }
    
    return order
  }
  
  async delete(id: number): Promise<string> {
    const order = this.orderRepository.create({id})
    order.status = false

    await this.orderRepository.save(order)
    
    return "Order removed"
  }
}
