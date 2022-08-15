import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: "O campo 'nome' é obrigatório" })
  @MinLength(3, { message: "O campo 'nome' deve ter no mínimo 3 caracteres" })
  @MaxLength(100, { message: "O campo 'nome' deve ter no máximo 100 caracteres" })
  name: string;

  @IsNotEmpty({ message: "O campo 'email' é obrigatório" })
  @IsEmail({ message: "O campo 'email' deve conter um email válido" })
  email: string;

  @IsNotEmpty({ message: "O campo 'usuário' é obrigatório" })
  @MinLength(4, { message: "O campo 'usuário' deve ter no mínimo 4 caracteres" })
  @MaxLength(20, { message: "O campo 'usuário' deve ter no mínimo 20 caracteres" })
  username: string;

  @IsNotEmpty({ message: "O campo 'senha' é obrigatório" })
  @MinLength(6, { message: "O campo 'senha' deve ter no mínimo 6 caracteres" })
  @MaxLength(20, { message: "O campo 'senha' deve ter no mínimo 20 caracteres" })
  password: string;
}
