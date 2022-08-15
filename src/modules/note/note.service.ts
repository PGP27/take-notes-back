import { CreateNoteDto } from './dto/CreateNoteDto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from './note.entity';
import { UpdateNoteDto } from './dto/UpdateNoteDto';
import { User, UserDocument } from '../user/user.entity';

@Injectable()
export class NoteService {

  constructor(
    @InjectModel(Note.name) private noteModel: Model<NoteDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(note: CreateNoteDto) {
    const { title, text, userId } = note;
    const userIdResult = await this.userModel.findById(userId);
    
    if (!userIdResult) {
      throw new HttpException(
        { message: 'Usuário não encontrado' },
        HttpStatus.BAD_REQUEST
      );
    }

    return await this.noteModel.create({
      title,
      text,
      user: userIdResult
    });
  }

  async update(note: UpdateNoteDto, id: string) {
    const { title, text, updatedAt } = note;

    const noteIdResult = await this.noteModel.findById(id);

    if (!noteIdResult) {
      throw new HttpException(
        { message: 'Nota não encontrado' },
        HttpStatus.BAD_REQUEST
      );
    }

    await this.noteModel.updateOne(
      { _id: id },
      { $set: { title, text, updatedAt } }
    );

    return await this.noteModel.findById(id).populate('user');
  }
}