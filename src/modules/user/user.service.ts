import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.entity';
import * as md5 from 'md5';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: CreateUserDto) {
    const { name, email, username, password } = user;

    const userEmailResult = await this.userModel.findOne({ email });

    if (userEmailResult) {
      throw new HttpException(
        { message: 'Esse email já existe' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const userUsernameResult = await this.userModel.findOne({ username });

    if (userUsernameResult) {
      throw new HttpException(
        { message: 'Esse usuário já existe' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser: User = {
      name,
      email,
      username,
      password: md5(password),
    };

    return await this.userModel.create(newUser);
  }

  async update(user: UpdateUserDto, id: string) {
    const { name, email, username, oldPassword, password } = user;

    const userIdResult = await this.userModel.findById(id);

    if (!userIdResult) {
      throw new HttpException(
        { message: 'Usuário não encontrado' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const userEmailResult = await this.userModel.findOne({ email });

    if (userEmailResult && userEmailResult.username !== userIdResult.username) {
      throw new HttpException(
        { message: 'Esse email já existe' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const userUsernameResult = await this.userModel.findOne({ username });

    if (
      userUsernameResult &&
      userUsernameResult.username !== userIdResult.username
    ) {
      throw new HttpException(
        { message: 'Esse usuário já existe' },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      (password && !oldPassword) ||
      (oldPassword && md5(oldPassword) !== userIdResult.password)
    ) {
      throw new HttpException(
        { message: 'Senha atual incorreta' },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          name,
          email,
          username,
          password: password ? md5(password) : userIdResult.password,
        },
      },
    );

    const updatedUser = await this.userModel.findById(id);

    return {
      name: updatedUser.name,
      email: updatedUser.email,
      username: updatedUser.username,
    };
  }
}
