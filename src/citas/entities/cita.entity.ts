import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { cita_estado } from "./cita_estado.enum";
import { Paciente } from "../../pacientes/entities/paciente.entity";
import { Receta } from "../../recetas/entities/receta.entity";
import { Doctor } from "../../doctors/entities/doctor.entity";

@Entity({ name: 'cita' })
export class Cita {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column('int')
    paciente_id!: number;

    @Column('int')
    doctor_id!: number;

    @Column({ type: 'date' })
    fecha!: Date;

    @Column({ type: 'time' })
    hora!: string;

    @Column('text')
    motivo_consulta!: string;

    @Column({
        type: 'enum',
        enum: cita_estado,
        default: cita_estado.PENDIENTE,
    })
    estado!: cita_estado;

    @ManyToOne(() => Paciente, (paciente) => paciente.citas)
    @JoinColumn({ name: 'paciente_id' })
    paciente!: Paciente;

    @OneToMany(() => Receta, (receta) => receta.cita, {
        eager: true,
    })
    recetas!: Receta[];

    @ManyToOne(() => Doctor, (doctor) => doctor.citas, {
        eager: true,
    })
    @JoinColumn({ name: 'doctor_id' })
    doctor!: Doctor;
}

