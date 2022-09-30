import { IsEmail, IsOptional, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @MinLength(3, { message: "O campo 'nome' deve ter no mínimo 3 caracteres" })
  @MaxLength(100, {
    message: "O campo 'nome' deve ter no máximo 100 caracteres",
  })
  name: string;

  @IsOptional()
  @IsEmail({ message: "O campo 'email' deve conter um email válido" })
  email: string;

  @IsOptional()
  @MinLength(4, {
    message: "O campo 'usuário' deve ter no mínimo 4 caracteres",
  })
  @MaxLength(20, {
    message: "O campo 'usuário' deve ter no máximo 20 caracteres",
  })
  username: string;

  @IsOptional()
  oldPassword: string;

  @IsOptional()
  @MinLength(6, { message: "O campo 'senha' deve ter no mínimo 6 caracteres" })
  @MaxLength(20, {
    message: "O campo 'senha' deve ter no máximo 20 caracteres",
  })
  password: string;
}
