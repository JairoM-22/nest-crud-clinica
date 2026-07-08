import { IsEmail, IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateDoctorDto {

    @IsString()
    @MinLength(1)
    nombre!: string;

    @IsEmail()
    @IsOptional()
    correo?: string;

    @IsString()
    @IsOptional()
    telefono?: string;

    @IsInt()
    @IsOptional()
    numero_consultorio?: number;
}