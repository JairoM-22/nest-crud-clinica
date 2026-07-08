import { IsDate, IsEmail, IsInt, IsOptional, IsString, MinLength } from "class-validator";

export class CreateDoctorDto {

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
    
        @IsOptional()
        @IsString()
        numero_consultorio?: string;



}
