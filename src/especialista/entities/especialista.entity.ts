import { Doctor } from "src/doctors/entities/doctor.entity";
import { Especialidad } from "src/especialidad/entities/especialidad.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'especialista'})
export class Especialista {
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('int')
    doctor_id!: number;

    @Column('int')
    especialidad_id!: number;

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