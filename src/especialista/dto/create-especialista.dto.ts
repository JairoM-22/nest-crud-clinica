import { IsOptional, IsInt } from "class-validator";

export class CreateEspecialistaDto {
    
    @IsInt()
    @IsOptional()
    doctor_id?: number;

    @IsInt()
    @IsOptional()
    especialidad_id?: number;

}