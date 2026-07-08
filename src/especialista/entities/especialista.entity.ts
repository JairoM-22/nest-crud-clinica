import { Doctor } from "src/doctors/entities/doctor.entity";
import { Especialidad } from "src/especialidad/entities/especialidad.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'Especialista'})
export class Especialista {
    
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('text')
    doctor_id!: string;

    @Column('text')
    especialidad_id!: string;

    // Relación a especialidad
    @ManyToOne(
        () => Especialidad,
        (especialidad) => especialidad.especialista,
        
    ) 
    especialidad!: Especialidad

    // Relación a doctor
    @ManyToOne(
        () => Doctor,
        (doctor) => doctor.especialista,
        
    ) 
    doctor!: Doctor
}