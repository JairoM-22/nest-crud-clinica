import { IsDate, IsEnum, IsInt, IsNumber, IsOptional, IsString } from "class-validator";
import { cita_estado } from "../entities/cita_estado.enum";


export class CreateCitaDto {

    @IsInt()
    id!: number;
    
    @IsOptional()
    @IsInt()
    paciente_id?: number;

    @IsOptional()
    @IsInt()
    doctor_id?:number;

    @IsOptional()
    @IsDate()
    fecha?: Date;

    @IsOptional()
    @IsString()
    hora?: string;

    @IsOptional()
    @IsString()
    motivo_consulta?: string;
    
    @IsEnum(cita_estado)
    estado?:cita_estado;

}
