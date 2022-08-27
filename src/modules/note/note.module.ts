import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteController } from './note.controller';
import { Note, NoteSchema } from './note.entity';
import { User, UserSchema } from '../user/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Note.name, schema: NoteSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
