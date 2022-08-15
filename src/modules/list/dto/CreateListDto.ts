import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateListDto {
  @IsNotEmpty({ message: "O título de uma lista é obrigatório" })
  @MinLength(4, { message: "O título de uma lista deve ter no mínimo 4 caracteres" })
  @MaxLength(20, { message: "O título de uma lista deve ter no máximo 20 caracteres" })
  title: string;

  @IsNotEmpty({ message: "O Id de um usuário é obrigatório para criar uma lista" })
  userId: string;
}
