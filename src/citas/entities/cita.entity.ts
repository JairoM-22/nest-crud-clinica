import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { cita_estado } from "./cita_estado.enum";



export class Cita {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('int')
    paciente_id!: number;

    @Column('int')
    doctor_id!: number;

    @CreateDateColumn({
         type: 'time',
    })
    fecha!: Date;

    @Column('datetime')
    hora!: Date;

    @Column('text')
    motivo_consulta!: string;


    //ENUMERACION
    @Column({
        type: 'enum',
        enum: cita_estado,
        default: cita_estado.PENDIENTE,
    })
    estado!: cita_estado;




}
