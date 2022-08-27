import { IsOptional, MaxLength, MinLength } from 'class-validator';

export class UpdateListDto {
  @IsOptional()
  @MinLength(4, {
    message: 'O título de uma lista deve ter no mínimo 4 caracteres',
  })
  @MaxLength(20, {
    message: 'O título de uma lista deve ter no máximo 20 caracteres',
  })
  title: string;
}
