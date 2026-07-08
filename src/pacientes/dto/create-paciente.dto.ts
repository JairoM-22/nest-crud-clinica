import { IsString, IsEmail, MinLength, IsDate, IsOptional, IsNumber, IsInt } from 'class-validator';

export class CreatePacienteDto {


    @IsInt()
    id!:number;

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


