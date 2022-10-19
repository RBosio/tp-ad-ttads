import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user-input';
import { UpdateUserInput } from './dto/update-user-input';
import { User } from './user.entity';

import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }
  
  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        id
      }
    })
  }
  
  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        email
      }
    })
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const saltRounds = 10
    const { password } = createUserInput
    const hashedPass = await hash(password, saltRounds)

    createUserInput.password = hashedPass

    const user = this.userRepository.create(createUserInput)
  
    return await this.userRepository.save(user)
  }
  
  async update(updateUserInput: UpdateUserInput): Promise<User> {
    await this.findOne(updateUserInput.id)
    
    const user = this.userRepository.create(updateUserInput)
    
    await this.userRepository.save(user)
    
    return await this.findOne(user.id)
  }

  async delete(id: number): Promise<User> {
    const user = this.userRepository.create({id})
    user.status = false

    await this.userRepository.save(user)
    
    return await this.findOne(user.id)
  }
}
