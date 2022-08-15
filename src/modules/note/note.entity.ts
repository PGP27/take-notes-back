import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { User } from '../user/user.entity';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Prop()
  title: string;

  @Prop()
  text: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  @Type(() => User)
  user: User;

  @Prop({ default: new Date() })
  createdAt: Date;

  @Prop()
  updatedAt: Date | null;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
