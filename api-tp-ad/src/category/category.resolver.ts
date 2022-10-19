import { Inject, UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Category } from "./category.entity";
import { CategoryService } from "./category.service";
import { CreateCategoryInput } from "./dto/create-category-input";
import { UpdateCategoryInput } from "./dto/update-category-input";

@Resolver(() => Category)
export class CategoryResolver {
  constructor(@Inject(CategoryService) private categoryService: CategoryService) {}
  
  @Query(() => [Category])
  async getCategories(): Promise<Category[]> {
    return this.categoryService.findAll()
  }

  @Query(() => Category)
  async getCategory(
    @Args('id', {type: () => Int}) id: number
  ): Promise<Category> {
    return this.categoryService.findOne(id)
  }

  @Mutation(() => Category)
  @UseGuards(JwtAuthGuard)
  async createCategory(
    @Args('createCategoryInput', {type: () => CreateCategoryInput}) createCategoryInput: CreateCategoryInput
  ): Promise<Category> {
    return this.categoryService.create(createCategoryInput)
  }

  @Mutation(() => Category)
  @UseGuards(JwtAuthGuard)
  async updateCategory(
    @Args('updateCategory', {type: () => UpdateCategoryInput}) updateCategory: UpdateCategoryInput
  ): Promise<Category> {
    return this.categoryService.update(updateCategory)
  }

  @Mutation(() => Category)
  @UseGuards(JwtAuthGuard)
  async deleteCategory(
    @Args('id', {type: () => Int}) id: number,
  ): Promise<Category> {
    return this.categoryService.delete(id)
  }
}