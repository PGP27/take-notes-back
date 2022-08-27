import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { List } from '../list/list.entity';

export type ItemDocument = Item & Document;

@Schema()
export class Item {
  @Prop()
  text: string;

  @Prop({ default: false })
  done: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: List.name })
  @Type(() => List)
  list: List;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
