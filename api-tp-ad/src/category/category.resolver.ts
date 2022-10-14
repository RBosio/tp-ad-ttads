import { Inject } from "@nestjs/common";
import { Args, ID, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
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
  async createCategory(
    @Args('createCategoryInput', {type: () => CreateCategoryInput}) createCategoryInput: CreateCategoryInput
  ): Promise<Category> {
    return this.categoryService.create(createCategoryInput)
  }

  @Mutation(() => Category)
  async updateCategory(
    @Args('updateCategory', {type: () => UpdateCategoryInput}) updateCategory: UpdateCategoryInput
  ): Promise<Category> {
    return this.categoryService.update(updateCategory)
  }

  @Mutation(() => Category)
  async deleteCategory(
    @Args('id', {type: () => Int}) id: number,
  ): Promise<Category> {
    return this.categoryService.delete(id)
  }
}