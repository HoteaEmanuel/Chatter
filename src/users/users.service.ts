import { UsersRepository } from './users.repository';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import * as bcrypt from 'bcrypt';

const isDuplicateKeyError = (err: unknown): boolean =>
  typeof err === 'object' &&
  err !== null &&
  (err as { code?: unknown }).code === 11000;

@Injectable()
export class UsersService {
  constructor(private readonly UsersRepository: UsersRepository) {}

  private async hashPassword(password: string) {
    return await bcrypt.hash(password, 12);
  }

  async create(createUserInput: CreateUserInput) {
    try {
      return await this.UsersRepository.create({
        ...createUserInput,
        password: await this.hashPassword(createUserInput.password),
      });
    } catch (err) {
      if (isDuplicateKeyError(err)) {
        throw new ConflictException('Email already in use.');
      }
      throw err;
    }
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

  async verifyUser(email: string, password: string) {
    const user = await this.UsersRepository.findOne({ email });

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    return user;
  }
}
