import { UserService } from 'src/module/user/user.service';
import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './auth.dto';
import { User } from '@prisma/client';

export interface JwtPayload {
  email: string;
  iat: number;
  exp: number;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    let user: User;
    try {
      user = await this.userService.findOne({ where: { email } });
    } catch (err) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${email}`,
      );
    }

    // find if user password match
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      throw new UnauthorizedException(
        `Wrong password for user with email: ${email}`,
      );
    }

    delete user.password;

    return user;
  }

  async verifyPayload(payload: JwtPayload): Promise<User> {
    let user: User;

    try {
      user = await this.userService.findOne({
        where: { email: payload.email },
      });
    } catch (error) {
      throw new UnauthorizedException(
        `There isn't any user with email: ${payload.email}`,
      );
    }
    delete user.password;

    return user;
  }

  async login(user: LoginDto) {
    const token = await this.generateToken(user);
    return { user, token };
  }

  public async create(data: {
    email: string;
    password: string;
    username: string;
  }) {
    try {
      // hash the password
      const pass = await this.hashPassword(data.password);

      // create the user
      const result = await this.userService.create({
        ...data,
        password: pass,
      });

      // generate token
      const token = await this.generateToken(result);

      // return the user and the token
      return { user: result, token };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  private async generateToken(user) {
    const token = await this.jwtService.signAsync({
      email: user.email,
      id: user.id,
      role: user.role,
    });
    return token;
  }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
