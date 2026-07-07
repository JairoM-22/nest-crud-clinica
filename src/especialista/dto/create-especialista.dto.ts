import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateEspecialistaDto {
    
    @IsString()
    @IsOptional()
    doctor_id?: string;

    @IsString()
    @IsOptional()
    especilidad_id?: string;

}