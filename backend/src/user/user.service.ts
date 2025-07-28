import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(
    email: string,
    name: string,
    plainPassword: string,
  ): Promise<User> {
    const hashed = await bcrypt.hash(plainPassword, 10);
    const user = this.usersRepository.create({ email, name, password: hashed });
    return this.usersRepository.save(user);
  }

  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

  // async findByEmail(email: string): Promise<User | undefined> {
  //   return this.usersRepository.findOne({ where: { email } });
  // }
}
