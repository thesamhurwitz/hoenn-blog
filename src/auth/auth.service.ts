import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { AuthPayload } from './auth-payload';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signup(signupDto: SignupDto) {
    const hash = await this.generateHash(signupDto.password);

    try {
      return await this.prisma.user.create({
        data: {
          username: signupDto.username,
          email: signupDto.email,
          hash,
        },
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException(
            'User with such username or email already exists.',
          );
        }
      }

      throw e;
    }
  }

  async validate(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        'User with such username does not exist.',
      );
    }

    if (!(await this.validateHash(password, user.hash))) {
      throw new UnauthorizedException('Wrong password.');
    }

    const { hash, ...result } = user;

    return result;
  }

  async getProfile(payload: AuthPayload) {
    const user = this.prisma.user.findUnique({
      where: {
        username: payload.username,
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        profile: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async getJwtToken(user) {
    const payload = {
      username: user.username,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async generateHash(password): Promise<string> {
    return await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
  }

  private async validateHash(password, hash): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
