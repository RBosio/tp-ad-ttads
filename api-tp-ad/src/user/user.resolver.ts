import { Inject } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateUserInput } from "./dto/create-user-input";
import { UpdateUserInput } from "./dto/update-user-input";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}
  
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Query(() => User)
  async getUser(
    @Args('id', {type: () => Int}) id: number
  ): Promise<User> {
    return this.userService.findOne(id)
  }

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput', {type: () => CreateUserInput}) createUserInput: CreateUserInput
  ): Promise<User> {
    return this.userService.create(createUserInput)
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUser', {type: () => UpdateUserInput}) updateUser: UpdateUserInput
  ): Promise<User> {
    return this.userService.update(updateUser)
  }

  @Mutation(() => User)
  async deleteUser(
    @Args('id', {type: () => Int}) id: number,
  ): Promise<User> {
    return this.userService.delete(id)
  }
}