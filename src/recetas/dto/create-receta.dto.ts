import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRecetaDto {
  @IsInt()
  @IsNotEmpty()
  cita_id: number;

  @IsString()
  @IsNotEmpty()
  medicamento: string;

  @IsString()
  @IsNotEmpty()
  dosis: string;

  @IsOptional()
  @IsString()
  instruccion?: string;

  @IsOptional()
  @IsDateString()
  fecha_emision?: string;
}