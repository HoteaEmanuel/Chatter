import { UsersRepository } from './users.repository';
import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private readonly UsersRepository: UsersRepository) {}

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }

  async create(createUserInput: CreateUserInput) {
    return this.UsersRepository.create({
      ...createUserInput,
      password: await this.hashPassword(createUserInput.password),
    });
  }

  async findAll() {
    return this.UsersRepository.find({});
  }

  async findOne(_id: string) {
    return this.UsersRepository.findOne({ _id });
  }

  async update(_id: string, updateUserInput: UpdateUserInput) {
    const { password, ...rest } = updateUserInput;
    return this.UsersRepository.findOneAndUpdate(
      { _id },
      {
        $set: {
          ...rest,
          ...(password && { password: await this.hashPassword(password) }),
        },
      },
    );
  }

  async remove(_id: string) {
    return this.UsersRepository.findOneAndDelete({ _id });
  }
}
