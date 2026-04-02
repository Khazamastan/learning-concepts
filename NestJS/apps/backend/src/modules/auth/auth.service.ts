import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import argon2 from 'argon2';

import { UsersService } from '../users/users.service.js';
import { SignInDto } from './dto/sign-in.dto.js';
import { SignUpDto } from './dto/sign-up.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(payload: SignUpDto): Promise<{ userId: string }> {
    const passwordHash = await argon2.hash(payload.password);
    const user = await this.usersService.create({
      email: payload.email,
      passwordHash,
      firstName: payload.firstName,
      lastName: payload.lastName,
    });

    return { userId: user.id };
  }

  async signIn(payload: SignInDto): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.usersService.findByEmail(payload.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await argon2.verify(user.passwordHash, payload.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        secret: this.configService.getOrThrow<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      },
    );

    await this.usersService.storeRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  async signOut(userId: string): Promise<void> {
    await this.usersService.clearRefreshToken(userId);
  }
}
