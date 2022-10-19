import { Inject, UseGuards } from "@nestjs/common";
import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateUserInput } from "./dto/create-user-input";
import { UpdateUserInput } from "./dto/update-user-input";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}
  
  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  async getUsers(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async getUser(
    @Args('id', {type: () => Int}) id: number
  ): Promise<User> {
    return this.userService.findOne(id)
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Args('updateUser', {type: () => UpdateUserInput}) updateUser: UpdateUserInput
  ): Promise<User> {
    return this.userService.update(updateUser)
  }

  @Mutation(() => User)
  @UseGuards(JwtAuthGuard)
  async deleteUser(
    @Args('id', {type: () => Int}) id: number,
  ): Promise<User> {
    return this.userService.delete(id)
  }
}