import { IsString, IsEmail,MinLength, IsDate } from 'class-validator';

export class CreatePacienteDto {

    id!:string


    @isString()
    nombre!:string

    @Column()  
    correo!:string

    @Column()
    telefono!:string

    @Column()
    fecha_nacimiento!:Date

    @CreateDateColumn({ type: 'timestamp', name: 'fecha_registro' })
    fechaRegistro!: Date;
}


