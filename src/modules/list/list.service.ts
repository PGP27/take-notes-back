import { CreateListDto } from './dto/CreateListDto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { List, ListDocument } from './list.entity';
import { UpdateListDto } from './dto/UpdateListDto';
import { User, UserDocument } from '../user/user.entity';

@Injectable()
export class ListService {

  constructor(
    @InjectModel(List.name) private listModel: Model<ListDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async create(list: CreateListDto) {
    const { title, userId } = list;

    const userIdResult = await this.userModel.findById(userId);

    if (!userIdResult) {
      throw new HttpException(
        { message: 'Usuário não encontrado' },
        HttpStatus.BAD_REQUEST
      );
    }

    return await this.listModel.create({
      title,
      user: userIdResult,
    });
  }

  async update(list: UpdateListDto, id: string) {
    const { title, updatedAt } = list;

    const listIdResult = await this.listModel.findById(id);

    if (!listIdResult) {
      throw new HttpException(
        { message: 'Lista não encontrada' },
        HttpStatus.BAD_REQUEST
      );
    }

    await this.listModel.updateOne(
      { _id: id },
      { $set: { title, updatedAt } }
    );

    return await this.listModel.findById(id).populate('user');
  }
}