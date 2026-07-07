import { Column, PrimaryGeneratedColumn } from "typeorm";

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
}
