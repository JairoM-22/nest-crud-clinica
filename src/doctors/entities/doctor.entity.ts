import { Especialista } from "../../especialista/entities/especialista.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cita } from "../../citas/entities/cita.entity";

@Entity({ name: 'doctor' })
export class Doctor {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text', {
        nullable: false,
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

    @Column('text', {
        unique: true,
    })
    numero_consultorio!: string;

    @OneToMany(
        () => Especialista,
        (especialista) => especialista.doctor,
        { cascade: true }
    ) 
    especialista: Especialista[]

    @OneToMany(() => Cita, (cita) => cita.doctor)
    citas: Cita[]
}