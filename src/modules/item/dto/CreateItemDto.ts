import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty({ message: 'O título de um item é obrigatório' })
  @MaxLength(50, {
    message: 'Um item de uma lista deve ter no máximo 50 caracteres',
  })
  text: string;

  @IsNotEmpty({ message: 'O Id de uma lista é obrigatório para criar um item' })
  listId: string;
}
