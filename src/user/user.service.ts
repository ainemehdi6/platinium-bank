import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';


@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private usersRepository: typeof User
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll<User>();
  }
}