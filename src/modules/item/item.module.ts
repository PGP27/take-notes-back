import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { Item, ItemSchema } from './item.entity';
import { List, ListSchema } from '../list/list.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }, { name: List.name, schema: ListSchema }])],
  controllers: [ItemController],
  providers: [ItemService]
})
export class ItemModule {}
