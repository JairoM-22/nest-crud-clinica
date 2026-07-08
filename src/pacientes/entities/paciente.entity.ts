import { Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { IsString, IsEmail, MinLength, IsDate } from 'class-validator';
import { Cita } from '../../citas/entities/cita.entity';

@Entity({ name: 'paciente' })
export class Paciente {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar')
    @IsString()
    @MinLength(1)
    nombre!: string;

    @Column('varchar', { unique: true })
    @IsEmail()
    @MinLength(1)  
    correo!: string;

    @Column('varchar', { nullable: true })
    @IsString()
    telefono!: string;

    @Column('date', { nullable: true })
    @IsDate()
    fecha_nacimiento!: Date;

    @CreateDateColumn({ type: 'timestamp', name: 'fecha_registro' })
    fechaRegistro!: Date;

    @OneToMany(() => Cita, (cita) => cita.paciente)
    citas!: Cita[];
}
