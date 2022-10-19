import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryInput } from './dto/create-category-input';
import { UpdateCategoryInput } from './dto/update-category-input';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find()
  }
  
  async findOne(id: number): Promise<Category> {
    return await this.categoryRepository.findOne({
      where: {
        id
      }
    })
  }

  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryInput)
  
    return await this.categoryRepository.save(category)
  }
  
  async update(updateCategoryInput: UpdateCategoryInput): Promise<Category> {
    await this.findOne(updateCategoryInput.id)
    
    const category = this.categoryRepository.create(updateCategoryInput)
    
    await this.categoryRepository.save(category)
    
    return await this.findOne(category.id)
  }

  async delete(id: number): Promise<Category> {
    const category = this.categoryRepository.create({id})
    category.status = false

    await this.categoryRepository.save(category)
    
    return await this.findOne(category.id)
  }
}
