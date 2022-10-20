import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderProduct } from './order-product.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { Product } from 'src/product/product.entity';
import { ProductService } from 'src/product/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderProduct, User, Product])],
  providers: [OrderService, OrderResolver, UserService, ProductService]
})
export class OrderModule {}
