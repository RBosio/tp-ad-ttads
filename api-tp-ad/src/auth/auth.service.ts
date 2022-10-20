import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

import { compare } from 'bcrypt';
import { LoginUserInput } from './dto/login-user-input';
import { LoginResponse } from './dto/login-response';
import { User } from 'src/user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from 'src/user/dto/create-user-input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
    ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findOneByEmail(email)
  
      if(user && await compare(password, user.password)){
        const {password, ...result} = user      
  
        return result
      }
  
      return null
    } catch(ex) {
      return null
    }
  }

  async login({id, name, surname, email}): Promise<LoginResponse> {
    const payload = {name: name, surname: surname, email: email}
    return {
      token: this.jwtService.sign({payload, sub: id}),
    }
  }

  async signup(createUserInput: CreateUserInput): Promise<User> {
    const user = await this.userService.findOneByEmail(createUserInput.email)
    
    if(user){
      throw new Error("User already exists!")
    }

    return await this.userService.create(createUserInput)
  }
}
