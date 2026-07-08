import { IsEmail, IsInt, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateDoctorDto {

        @IsInt()
        id!: number;

        @IsString()
        @MinLength(1)
        nombre!: string;

        @IsEmail()
        @IsOptional()
        correo!: string;

        @IsString()
        @IsOptional()
        telefono?: string;

        @IsString()
        @IsOptional()
        numero_consultorio?: string;
}