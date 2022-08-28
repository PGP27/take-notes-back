import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as md5 from 'md5';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/user.entity';
import { Model } from 'mongoose';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { LoginRequest } from './dto/LoginRequest';

class Decode {
  id: string;
  name: string;
  email: string;
  username: string;
  iat: string;
  exp: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(REQUEST) private request: Request,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}
  private jwt = new JwtService({ secret: process.env.SECRET_KEY });

  public decodeByRequest(request = this.request): Decode {
    const authorization = (request.headers.authorization ||
      request.query.token) as string;
    if (!authorization) {
      throw new HttpException(
        { message: ['Token não autorizado'] },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = authorization.replace('Bearer ', '').trim();

    const decoded = this.jwt.decode(token) as Decode;

    return decoded;
  }

  async validateUser(username: string, password: string) {
    const user = await this.userModel.findOne({ username });

    if (user && md5(password) === user.password) {
      const { id, name, email, username } = user;
      return {
        id,
        name,
        email,
        username,
      };
    }

    return null;
  }

  async login(login: LoginRequest) {
    const { username, password } = login;

    const loginResult = await this.userModel.findOne({ username });

    if (!loginResult) {
      throw new HttpException(
        { message: 'Erro na autenticação' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    if (loginResult.password !== md5(password)) {
      throw new HttpException(
        { message: 'Erro na autenticação' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      user: loginResult,
      token: this.jwtService.sign({
        id: loginResult._id,
        name: loginResult.name,
        email: loginResult.email,
        username: loginResult.username,
      }),
    };
  }
}
