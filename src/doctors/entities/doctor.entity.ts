import { Especialista } from "../../especialista/entities/especialista.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column('int', {
        unique: true,
    })
    numero_consultorio!: number;

    @OneToMany(
        () => Especialista,
        (especialista) => especialista.doctor,
        { cascade: true }
    ) 
    especialista: Especialista[]
}