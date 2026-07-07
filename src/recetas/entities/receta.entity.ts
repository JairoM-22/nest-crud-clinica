import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

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


}
