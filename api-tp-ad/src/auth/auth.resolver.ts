import { UseGuards, Request } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from 'src/user/dto/create-user-input';
import { User } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user-input';
import { LocalAuthGuard } from './local-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}
  
  @UseGuards(LocalAuthGuard)
  @Mutation(() => LoginResponse)
  async login(
    @Args("loginUserInput", {type: () => LoginUserInput}) loginUserInput: LoginUserInput,
    @Context() context
    ): Promise<LoginResponse> {
    return this.authService.login(context.user)
  }

  @Mutation(() => User)
  async signup(
    @Args("createUserInput", {type: () => CreateUserInput}) createUserInput: CreateUserInput
  ): Promise<User> {
    return this.authService.signup(createUserInput)
  }
}
