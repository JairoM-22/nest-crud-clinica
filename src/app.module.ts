import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PacientesModule } from './pacientes/pacientes.module';
import { CitasModule } from './citas/citas.module';
import { DoctorsModule } from './doctors/doctors.module';
import { EspecialidadModule } from './especialidad/especialidad.module';
import { RecetasModule } from './recetas/recetas.module';
import { EspecialistaModule } from './especialista/especialista.module';

@Module({
  imports: [ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 5432),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,      
      autoLoadEntities: true,
      synchronize: true,  

    }),

    PacientesModule,

    CitasModule,

    DoctorsModule,

    EspecialidadModule,

    RecetasModule,

    EspecialistaModule
  ]
})
export class AppModule {}
