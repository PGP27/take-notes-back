import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty({ message: "O título de uma nota é obrigatório" })
  @MinLength(4, { message: "O título de uma nota deve ter no mínimo 4 caracteres" })
  @MaxLength(20, { message: "O título de uma nota deve ter no máximo 20 caracteres" })
  title: string;

  @IsOptional()
  @MaxLength(255, { message: "O texto de uma nota deve ter no máximo 255 caracteres" })
  text: string | null;

  @IsNotEmpty({ message: "Um Id de usuário é obrigatório para criar uma nota" })
  userId: string;
}
