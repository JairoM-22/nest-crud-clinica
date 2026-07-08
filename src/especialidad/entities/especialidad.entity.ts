import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Especialista } from "../../especialista/entities/especialista.entity";

@Entity({ name: 'especialidad' })
export class Especialidad {
    
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('text')
    nombre!: string;

    @Column({
        type: 'text',
        nullable: true
    })
    descripcion!: string;

    @OneToMany(
        () => Especialista,
        (especialista) => especialista.especialidad,
        { cascade: true }
    ) 
    especialista!: Especialista[];
}