import { CreateItemDto } from './dto/CreateItemDto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from './item.entity';
import { UpdateItemDto } from './dto/UpdateItemDto';
import { List, ListDocument } from '../list/list.entity';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
    @InjectModel(List.name) private listModel: Model<ListDocument>,
  ) {}

  async create(item: CreateItemDto) {
    const { text, listId } = item;

    const listIdResult = await this.listModel.findById(listId);

    if (!listIdResult) {
      throw new HttpException(
        { message: 'Lista não encontrada' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.itemModel.create({
      text,
      list: listIdResult,
    });
  }

  async update(item: UpdateItemDto, id: string) {
    const { text, done, updatedAt } = item;

    const itemIdResult = await this.itemModel.findById(id);

    if (!itemIdResult) {
      throw new HttpException(
        { message: 'Item não encontrado' },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.itemModel.updateOne(
      { _id: id },
      { $set: { text, done, updatedAt } },
    );

    return await this.itemModel.findById(id).populate('list').populate('user');
  }
}
