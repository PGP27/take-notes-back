import { IsNotEmpty } from 'class-validator';

export class LoginRequest {
  @IsNotEmpty({ message: "'Usuário' é um campo obrigatório" })
  username: string;

  @IsNotEmpty({ message: "'Senha' é um campo obrigatório" })
  password: string;
}
