import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty({ message: "O título de um item é obrigatório" })
  @MaxLength(100, { message: "Um item de uma lista deve ter no máximo 100 caracteres" })
  text: string;

  @IsNotEmpty({ message: "O Id de uma lista é obrigatório para criar um item" })
  listId: string;
}
