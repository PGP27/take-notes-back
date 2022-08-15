import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class UpdateItemDto {
  @IsOptional()
  @MaxLength(100, { message: "Um item de uma lista deve ter no máximo 100 caracteres" })
  text: string;
  
  @IsOptional()
  done: boolean;

  @IsNotEmpty({ message: "Data de atualização é obrigatória" })
  updatedAt: Date;
}
