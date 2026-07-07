import { IsString, IsEmail, MinLength, IsDate, IsOptional } from 'class-validator';

export class CreatePacienteDto {
    @IsString()
    @MinLength(1)
    nombre!: string;

    @IsEmail()
    correo!: string;

    @IsString()
    @IsOptional()
    telefono?: string;

    @IsDate()
    @IsOptional()
    fecha_nacimiento?: Date;
}


