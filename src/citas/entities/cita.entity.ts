import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { cita_estado } from "./cita_estado.enum";
import { Receta } from 'src/recetas/entities/receta.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';


@Entity({name: 'Cita'})
export class Cita {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('int')
    paciente_id!: number;

    @Column('int')
    doctor_id!: number;

    @CreateDateColumn({
         type: 'time',
    })
    fecha!: Date;

    @Column('datetime')
    hora!: Date;

    @Column('text')
    motivo_consulta!: string;


    //ENUMERACION
    @Column({
        type: 'enum',
        enum: cita_estado,
        default: cita_estado.PENDIENTE,
    })
    estado!: cita_estado;



    @OneToMany(() => Receta,
        (receta) => receta.cita_id, {
        eager: true,
    })
    recetas!: Receta[];

    @ManyToOne(() => Doctor,
    (Doctor) => Doctor.id,{
        eager:true
    })
    doctor!: Doctor;


}
