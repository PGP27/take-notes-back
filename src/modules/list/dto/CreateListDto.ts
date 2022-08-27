import { IsNotEmpty } from 'class-validator';

export class CreateListDto {
  @IsNotEmpty({
    message: 'O Id de um usuário é obrigatório para criar uma lista',
  })
  userId: string;
}
