import { IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty({ message: 'Um Id de usuário é obrigatório para criar uma nota' })
  userId: string;
}
