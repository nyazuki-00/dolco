import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    plainPassword: string,
  ): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(plainPassword, user.password);
    return isPasswordValid ? user : null;
  }

  async login(user: User) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(body: {
    email: string;
    name: string;
    password: string;
  }): Promise<User> {
    const existing = await this.userRepository.findOne({
      where: { email: body.email },
    });
    if (existing) {
      throw new BadRequestException('Email already in use');
    }
    const user = this.userRepository.create(body);
    return this.userRepository.save(user);
  }
}
