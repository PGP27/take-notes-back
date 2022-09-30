import { IsOptional, MaxLength } from 'class-validator';

export class UpdateNoteDto {
  @IsOptional()
  @MaxLength(20, {
    message: 'O título de uma nota deve ter no máximo 20 caracteres',
  })
  title: string;

  @IsOptional()
  @MaxLength(255, {
    message: 'O texto de uma nota deve ter no máximo 255 caracteres',
  })
  text: string | null;
}
