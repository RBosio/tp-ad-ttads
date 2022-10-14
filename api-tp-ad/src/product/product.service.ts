import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductInput } from './dto/create-product-input';
import { UpdateProductInput } from './dto/update-product-input';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find()
  }
  
  async findOne(id: number): Promise<Product> {
    return await this.productRepository.findOneOrFail({
      where: {
        id
      }
    })
  }

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const product = this.productRepository.create(createProductInput)
  
    return await this.productRepository.save(product)
  }
  
  async update(updateProductInput: UpdateProductInput): Promise<Product> {
    const product = this.productRepository.create(updateProductInput)
    
    await this.productRepository.save(product)
    
    return await this.findOne(product.id)
  }

  async delete(id: number): Promise<Product> {
    const product = this.productRepository.create({id})
    product.status = false

    await this.productRepository.save(product)
    
    return await this.findOne(product.id)
  }
}
