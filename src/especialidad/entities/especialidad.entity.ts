import { Especialista } from "src/especialista/entities/especialista.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Especialidad {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    nombre: string;

    @Column({
        type: 'text',
        nullable: true
    })
    descripcion: string;

    // Relación a especialista
    @OneToMany(
        () => Especialista,
        (especialista) => especialista.especialidad,
        {cascade: true}
    ) 
    especialista: Especialista[];
}
