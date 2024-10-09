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

  async create(card: Partial<User>) {
    return this.usersRepository.create(card);
  }

  async findOne(id: number) {
    return this.usersRepository.findOne({
      where: { id }
    });
  }

  async update(id: number, updateCardDto: Partial<User>) {
    return this.usersRepository.update<User>(updateCardDto, {
      where: { id },
      returning: true,
    });
  }

  async delete(id: number) {
    return this.usersRepository.destroy({
      where: { id },
    });
  }
}