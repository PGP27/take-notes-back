import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/CreateNoteDto';
import { UpdateNoteDto } from './dto/UpdateNoteDto';
import { NoteService } from './note.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.noteService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.noteService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.noteService.create(createNoteDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Body() updateNoteDto: UpdateNoteDto, @Param('id') id: string) {
    return this.noteService.update(updateNoteDto, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.noteService.delete(id);
  }
}
