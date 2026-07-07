import { Timestamp } from "typeorm/driver/mongodb/bson.typings.js"
import {Column,Entity,OneToMany ,PrimaryGeneratedColumn,CreateDateColumn} from 'typeorm'  
import { IsString, IsEmail,MinLength, IsDate } from 'class-validator';

@Entity({name: 'products'})
export class Paciente {
    @PrimaryGeneratedColumn()
    id!:string


    @IsString()
    @MinLength(1)
    nombre!:string

    @IsEmail()
    @MinLength(1)  
    correo!:string

    @IsString()
    @MinLength(1)
    telefono!:string

    @IsDate()
    @MinLength(1)
    fecha_nacimiento!:Date

    @CreateDateColumn({ type: 'timestamp', name: 'fecha_registro' })
    fechaRegistro!: Date;
}
