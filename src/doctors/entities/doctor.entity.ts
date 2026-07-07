import { Cita } from "src/citas/entities/cita.entity";
import { Column, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Doctor {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('text', {
        unique: true,
        nullable:false,
    })
    nombre!: string;    


    @Column('text', {
        unique: true,
    })
    correo!: string;  
    
    
    @Column('text', {
        unique: true,
    })
    telefono!: string;

    @Column('int', {
        unique: true,
    })
    numero_consultorio!: number;

    @OneToMany(()=> Cita, (Cita) => Cita.doctor_id,{
        eager:true
    })
    citas!: Cita[];
}
