import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
