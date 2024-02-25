import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from 'src/users/dtos/CreateUserInput';
import { User } from 'src/graphql/models/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getUsers() {
    return this.userRepository.find({
      relations: ['campaigns'],
    });
  }

  getUserById(id: string, relation: boolean) {
    return this.userRepository.findOne({
      relations: relation ? ['campaigns'] : undefined,
      where: {
        id,
      },
    });
  }

  async createUser(user: CreateUserInput) {
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
    return await this.getUserById(newUser.id, false);
  }
}
