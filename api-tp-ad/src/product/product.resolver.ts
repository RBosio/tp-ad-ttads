import { Inject } from '@nestjs/common';
import { Resolver, Query, ID, Args, Mutation, Int } from '@nestjs/graphql';
import { CreateProductInput } from './dto/create-product-input';
import { UpdateProductInput } from './dto/update-product-input';
import { Product } from './product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(@Inject(ProductService) private productService: ProductService) {}

  @Query(() => [Product])
  async getAllProducts(): Promise<Product[]> {
    return this.productService.findAll()
  }
  
  @Query(() => Product)
  async getProduct(
    @Args('id', {type: () => Int}) id: number
  ): Promise<Product> {
    return this.productService.findOne(id)
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput
  ): Promise<Product> {
    return this.productService.create(createProductInput)
  }
  
  @Mutation(() => Product)
  async updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput
  ): Promise<Product> {
    return this.productService.update(updateProductInput)
  }
  
  @Mutation(() => Product)
  async deleteProduct(
    @Args('id', {type: () => Int}) id: number
  ): Promise<Product> {
    return this.productService.delete(id)
  }
}
  