import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { QueryUserPrams, UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async create(data: CreateUserDto) {
    const tweet = await this.repository.create({
      data: data as unknown as User,
    });

    return tweet;
  }

  async findAll(params: QueryUserPrams) {
    const users = await this.repository.findAll(params);
    return users;
  }

  async findById(id: number) {
    const users = await this.repository.findOne({
      where: {
        id,
      },
    });
    return users;
  }

  async findOne(filter: { where?: Prisma.UserWhereInput }) {
    const users = await this.repository.findOne(filter);
    return users;
  }

  async findOneByEmail(email: string) {
    const users = await this.repository.findOne({
      where: {
        email,
      },
    });
    return users;
  }

  async updateById(id: number, data: User) {
    const user = await this.repository.update({
      where: {
        id,
      },
      data,
    });

    return user;
  }

  async delete(id: number) {
    return await this.repository.delete({
      where: {
        id,
      },
    });
  }
}
