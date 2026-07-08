import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Cita } from '../../citas/entities/cita.entity';

@Entity({ name: 'receta' })
export class Receta {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('int')
    cita_id!: number;

    @Column('text', { nullable: false })
    medicamento!: string;

    @Column('text', { nullable: false })
    dosis!: string;

    @Column('text')
    instruccion!: string;

    @CreateDateColumn({ type: 'timestamp', name: 'fecha_emision' })
    fecha_emision!: Date;

    @ManyToOne(() => Cita, (cita) => cita.recetas)
    @JoinColumn({ name: 'cita_id' })
    cita!: Cita;
}
