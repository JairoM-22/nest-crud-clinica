import { Cita } from "src/citas/entities/cita.entity";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity({name: 'receta'})
export class Receta {

    @PrimaryGeneratedColumn('uuid')
    id!: string;


    @Column('int')
    cita_id!: number;

    
    @Column('text',{
        nullable:false
    })
    medicamento!: string;

    @Column('text',{
        nullable:false
    })
    dosis!: string;

    @Column('text')
    instruccion!: string;

    @CreateDateColumn({
            type: 'timestamp',
    })
    fecha_emision!: Date;

    @ManyToOne(()=>Cita, (Cita)=> Cita.id,{
        cascade: true,
        eager: true,
    })
    cita!: Cita;

}
