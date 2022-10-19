import { Inject, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductInput } from './dto/create-product-input';
import { UpdateProductInput } from './dto/update-product-input';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(@Inject(ProductService) private productService: ProductService) {}

  @Query(() => [Product])
  async getProducts(): Promise<Product[]> {
    return this.productService.findAll()
  }
  
  @Query(() => Product)
  async getProduct(
    @Args('id', {type: () => Int}) id: number
  ): Promise<Product> {
    return this.productService.findOne(id)
  }

  @Mutation(() => Product)
  @UseGuards(JwtAuthGuard)
  async createProduct(
    @Args('createProductInput', {type: () => CreateProductInput}) createProductInput: CreateProductInput
  ): Promise<Product> {
    return this.productService.create(createProductInput)
  }
  
  @Mutation(() => Product)
  @UseGuards(JwtAuthGuard)
  async updateProduct(
    @Args('updateProductInput', {type: () => UpdateProductInput}) updateProductInput: UpdateProductInput
  ): Promise<Product> {
    return this.productService.update(updateProductInput)
  }
  
  @Mutation(() => Product)
  @UseGuards(JwtAuthGuard)
  async deleteProduct(
    @Args('id', {type: () => Int}) id: number
  ): Promise<Product> {
    return this.productService.delete(id)
  }
}
  