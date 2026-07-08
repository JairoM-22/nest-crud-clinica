import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(private readonly dataSource: DataSource) {}

  async runSeed() {
    try {
      // 1. Drop all tables and recreate them from entities
      await this.dataSource.synchronize(true);

      // 2. Insert Paciente
      await this.dataSource.query(`
        INSERT INTO "paciente" ("id", "nombre", "correo", "telefono", "fecha_nacimiento", "fecha_registro") VALUES
        (1, 'Juan Pérez García', 'juan.perez@email.com', '3121234567', '1980-05-15', '2024-01-10 09:30:00'),
        (2, 'María Rodríguez López', 'maria.rodriguez@email.com', '3132345678', '1992-08-22', '2024-01-12 10:15:00'),
        (3, 'Carlos Martínez Suárez', 'carlos.martinez@email.com', '3143456789', '1985-03-10', '2024-01-15 14:20:00'),
        (4, 'Ana García Flores', 'ana.garcia@email.com', '3154567890', '1990-11-28', '2024-01-18 11:00:00'),
        (5, 'Luis Hernández Medina', 'luis.hernandez@email.com', '3165678901', '1975-07-05', '2024-01-20 15:45:00'),
        (6, 'Carmen Sánchez Torres', 'carmen.sanchez@email.com', '3176789012', '1988-12-14', '2024-01-22 09:00:00'),
        (7, 'David López Ramírez', 'david.lopez@email.com', '3187890123', '1995-02-19', '2024-01-25 13:30:00'),
        (8, 'Rosa Jiménez Castillo', 'rosa.jimenez@email.com', '3198901234', '1982-09-30', '2024-01-28 10:45:00'),
        (9, 'Pedro Vargas Moreno', 'pedro.vargas@email.com', '3209012345', '1978-06-12', '2024-02-01 08:20:00'),
        (10, 'Lucia Fernández Ruiz', 'lucia.fernandez@email.com', '3210123456', '1993-04-08', '2024-02-05 14:00:00'),
        (11, 'Francisco Díaz Acosta', 'francisco.diaz@email.com', '3221234567', '1981-10-23', '2024-02-08 11:30:00'),
        (12, 'Beatriz Morales Gómez', 'beatriz.morales@email.com', '3232345678', '1987-01-17', '2024-02-10 09:15:00'),
        (13, 'Raúl Castro Ortiz', 'raul.castro@email.com', '3243456789', '1976-08-09', '2024-02-12 15:00:00'),
        (14, 'Sofía Reyes Martín', 'sofia.reyes@email.com', '3254567890', '1994-05-21', '2024-02-15 10:30:00'),
        (15, 'Marcos Navarro Duarte', 'marcos.navarro@email.com', '3265678901', '1989-12-03', '2024-02-18 13:45:00'),
        (16, 'Verónica Silva Parra', 'veronica.silva@email.com', '3276789012', '1991-03-27', '2024-02-20 09:00:00'),
        (17, 'Arturo Corrales Blanco', 'arturo.corrales@email.com', '3287890123', '1984-07-14', '2024-02-22 14:20:00'),
        (18, 'Gloria Mendoza Ríos', 'gloria.mendoza@email.com', '3298901234', '1979-11-06', '2024-02-25 10:00:00'),
        (19, 'Óscar Pineda García', 'oscar.pineda@email.com', '3209012345', '1986-02-25', '2024-02-28 15:30:00'),
        (20, 'Camila Rojas Contreras', 'camila.rojas@email.com', '3210123456', '1996-06-11', '2024-03-02 11:15:00'),
        (21, 'Roberto Aguirre López', 'roberto.aguirre@email.com', '3221234567', '1983-09-19', '2024-03-05 09:45:00'),
        (22, 'Mariana Flores Cabrera', 'mariana.flores@email.com', '3232345678', '1992-04-30', '2024-03-08 13:00:00'),
        (23, 'Vicente Herrera Toro', 'vicente.herrera@email.com', '3243456789', '1977-12-08', '2024-03-10 10:30:00'),
        (24, 'Juliana Ortiz Hernández', 'juliana.ortiz@email.com', '3254567890', '1998-01-22', '2024-03-12 14:45:00'),
        (25, 'Gerardo Quintero Fuentes', 'gerardo.quintero@email.com', '3265678901', '1980-10-15', '2024-03-15 09:00:00'),
        (26, 'Daniela Serrano Arias', 'daniela.serrano@email.com', '3276789012', '1994-08-05', '2024-03-18 11:20:00'),
        (27, 'Hector Tapia Maldonado', 'hector.tapia@email.com', '3287890123', '1982-05-28', '2024-03-20 15:15:00'),
        (28, 'Alejandra Urrutia González', 'alejandra.urrutia@email.com', '3298901234', '1989-03-16', '2024-03-22 10:00:00'),
        (29, 'Ángel Vásquez Miranda', 'angel.vasquez@email.com', '3209012345', '1985-11-20', '2024-03-25 13:30:00'),
        (30, 'Yanira Zambrano López', 'yanira.zambrano@email.com', '3210123456', '1991-07-12', '2024-03-28 09:45:00'),
        (31, 'Andrés Acuña Romero', 'andres.acuna@email.com', '3221234567', '1987-02-14', '2024-03-30 14:00:00'),
        (32, 'Beatrice Barrera Soto', 'beatrice.barrera@email.com', '3232345678', '1993-11-03', '2024-04-01 10:30:00'),
        (33, 'César Ceballos Mora', 'cesar.ceballos@email.com', '3243456789', '1981-06-27', '2024-04-03 15:45:00'),
        (34, 'Diana Dávila Pacheco', 'diana.davila@email.com', '3254567890', '1994-09-19', '2024-04-05 11:00:00'),
        (35, 'Esteban Espinosa Vega', 'esteban.espinosa@email.com', '3265678901', '1988-04-12', '2024-04-07 09:30:00')
      `);

      // 3. Insert Especialidad
      await this.dataSource.query(`
        INSERT INTO "especialidad" ("id", "nombre", "descripcion") VALUES
        (1, 'Cardiología', 'Especialidad dedicada al diagnóstico y tratamiento de enfermedades del corazón y del sistema circulatorio'),
        (2, 'Dermatología', 'Rama de la medicina que se ocupa del estudio y tratamiento de las enfermedades de la piel'),
        (3, 'Neurología', 'Especialidad médica que trata las enfermedades del sistema nervioso'),
        (4, 'Oftalmología', 'Especialidad que se dedica al diagnóstico y tratamiento de las enfermedades de los ojos'),
        (5, 'Otorrinolaringología', 'Especialidad que trata las enfermedades de oído, nariz y garganta'),
        (6, 'Gastroenterología', 'Especialidad que estudia el sistema digestivo y sus enfermedades'),
        (7, 'Neumología', 'Especialidad que se ocupa de las enfermedades del aparato respiratorio'),
        (8, 'Endocrinología', 'Especialidad que trata las enfermedades de las glándulas endocrinas'),
        (9, 'Urología', 'Especialidad que trata las enfermedades del sistema urinario'),
        (10, 'Psiquiatría', 'Especialidad médica que se ocupa del diagnóstico y tratamiento de los trastornos mentales'),
        (11, 'Ginecología', 'Especialidad que se dedica al estudio de la salud femenina'),
        (12, 'Traumatología', 'Rama de la medicina que se ocupa del tratamiento de traumatismos y lesiones'),
        (13, 'Reumatología', 'Especialidad que trata las enfermedades reumáticas e inflamatorias'),
        (14, 'Oncología', 'Especialidad médica dedicada al estudio y tratamiento del cáncer'),
        (15, 'Pediatría', 'Rama de la medicina dedicada al diagnóstico y tratamiento de enfermedades en niños')
      `);

      // 4. Insert Doctor
      await this.dataSource.query(`
        INSERT INTO "doctor" ("id", "nombre", "correo", "telefono", "numero_consultorio") VALUES
        (1, 'Dr. Juan Carlos Ramírez', 'j.ramirez@clinica.com', '3001234567', 101),
        (2, 'Dra. María González López', 'm.gonzalez@clinica.com', '3012345678', 102),
        (3, 'Dr. Carlos Eduardo Martínez', 'c.martinez@clinica.com', '3023456789', 103),
        (4, 'Dra. Laura Fernández Ruiz', 'l.fernandez@clinica.com', '3034567890', 104),
        (5, 'Dr. Roberto Sánchez Díaz', 'r.sanchez@clinica.com', '3045678901', 105),
        (6, 'Dra. Patricia Jiménez Castro', 'p.jimenez@clinica.com', '3056789012', 106),
        (7, 'Dr. Andrés Felipe López', 'a.lopez@clinica.com', '3067890123', 107),
        (8, 'Dra. Catalina Rodríguez', 'c.rodriguez@clinica.com', '3078901234', 108),
        (9, 'Dr. Fernando Vargas Morales', 'f.vargas@clinica.com', '3089012345', 109),
        (10, 'Dra. Viviana Torres Campos', 'v.torres@clinica.com', '3090123456', 110),
        (11, 'Dr. Javier Hernández Acosta', 'j.hernandez@clinica.com', '3001111111', 201),
        (12, 'Dra. Sandra Moreno García', 's.moreno@clinica.com', '3012222222', 202),
        (13, 'Dr. Alejandro García Silva', 'a.garcia@clinica.com', '3023333333', 203),
        (14, 'Dra. Isabel Cruz Mendoza', 'i.cruz@clinica.com', '3034444444', 204),
        (15, 'Dr. Gustavo Duarte López', 'g.duarte@clinica.com', '3045555555', 205),
        (16, 'Dra. Roxana Peña Flores', 'r.pena@clinica.com', '3056666666', 206),
        (17, 'Dr. Felipe Herrera González', 'f.herrera@clinica.com', '3067777777', 207),
        (18, 'Dra. Natalia Ossa Arévalo', 'n.ossa@clinica.com', '3078888888', 208),
        (19, 'Dr. Luis Alberto Campos', 'l.campos@clinica.com', '3089999999', 209),
        (20, 'Dra. Eugenia Prado Soto', 'e.prado@clinica.com', '3090000000', 210)
      `);

      // 5. Insert Especialista
      await this.dataSource.query(`
        INSERT INTO "especialista" ("id", "doctor_id", "especialidad_id") VALUES
        (1, 1, 1),
        (2, 2, 2),
        (3, 3, 3),
        (4, 4, 4),
        (5, 5, 5),
        (6, 6, 6),
        (7, 7, 7),
        (8, 8, 8),
        (9, 9, 9),
        (10, 10, 10),
        (11, 11, 11),
        (12, 12, 12),
        (13, 13, 13),
        (14, 14, 14),
        (15, 15, 15),
        (16, 1, 8),
        (17, 3, 13),
        (18, 6, 3),
        (19, 16, 1),
        (20, 17, 7),
        (21, 18, 2),
        (22, 19, 9),
        (23, 20, 11)
      `);

      // 6. Insert Cita
      await this.dataSource.query(`
        INSERT INTO "cita" ("id", "paciente_id", "doctor_id", "fecha", "hora", "motivo_consulta", "estado") VALUES
        (1, 1, 1, '2024-03-01', '09:00:00', 'Control de presión arterial', 'realizada'),
        (2, 2, 2, '2024-03-02', '10:30:00', 'Revisión de problemas dermatológicos', 'realizada'),
        (3, 3, 3, '2024-03-03', '11:00:00', 'Consulta por dolores de cabeza', 'realizada'),
        (4, 4, 4, '2024-03-04', '14:00:00', 'Revisión de la vista', 'realizada'),
        (5, 5, 5, '2024-03-05', '15:30:00', 'Problema de sinusitis', 'realizada'),
        (6, 6, 6, '2024-03-06', '09:30:00', 'Molestias digestivas', 'realizada'),
        (7, 7, 7, '2024-03-07', '13:00:00', 'Tosecilla persistente', 'realizada'),
        (8, 8, 8, '2024-03-08', '10:00:00', 'Control de diabetes', 'realizada'),
        (9, 9, 9, '2024-03-09', '14:30:00', 'Problema urinario', 'realizada'),
        (10, 10, 10, '2024-03-10', '11:30:00', 'Consulta de ansiedad', 'realizada'),
        (11, 11, 11, '2024-03-11', '09:00:00', 'Revisión prenatal', 'realizada'),
        (12, 12, 12, '2024-03-12', '15:00:00', 'Lesión en rodilla', 'realizada'),
        (13, 13, 13, '2024-03-13', '10:30:00', 'Dolor en articulaciones', 'realizada'),
        (14, 14, 1, '2024-03-14', '11:00:00', 'Seguimiento cardiaco', 'realizada'),
        (15, 15, 2, '2024-03-15', '09:30:00', 'Tratamiento de acné', 'realizada'),
        (16, 16, 3, '2024-03-16', '14:00:00', 'Migrañas frecuentes', 'realizada'),
        (17, 17, 4, '2024-03-17', '10:00:00', 'Consulta oftalmológica', 'realizada'),
        (18, 18, 5, '2024-03-18', '13:30:00', 'Otitis media', 'realizada'),
        (19, 19, 6, '2024-03-19', '09:00:00', 'Reflujo gástrico', 'realizada'),
        (20, 20, 7, '2024-03-20', '15:00:00', 'Control de asma', 'realizada'),
        (21, 21, 8, '2024-03-21', '10:30:00', 'Control de tiroides', 'realizada'),
        (22, 22, 9, '2024-03-22', '14:00:00', 'Consulta urológica', 'realizada'),
        (23, 23, 10, '2024-03-23', '11:00:00', 'Seguimiento psiquiátrico', 'realizada'),
        (24, 24, 11, '2024-03-24', '09:30:00', 'Revisión ginecológica', 'realizada'),
        (25, 25, 12, '2024-03-25', '15:00:00', 'Evaluación de fractura', 'realizada'),
        (26, 26, 13, '2024-04-06', '10:30:00', 'Artritis reumatoide', 'pendiente'),
        (27, 27, 14, '2024-04-07', '13:00:00', 'Consulta oncológica', 'pendiente'),
        (28, 28, 15, '2024-04-08', '09:00:00', 'Control pediátrico', 'pendiente'),
        (29, 29, 1, '2024-04-09', '14:00:00', 'Revisión de colesterol', 'pendiente'),
        (30, 30, 2, '2024-04-10', '11:00:00', 'Tratamiento de verrugas', 'pendiente'),
        (31, 1, 16, '2024-04-11', '10:00:00', 'Consulta cardiaca', 'pendiente'),
        (32, 2, 17, '2024-04-12', '15:30:00', 'Revisión respiratoria', 'pendiente'),
        (33, 3, 18, '2024-04-13', '09:30:00', 'Consulta dermatológica', 'pendiente'),
        (34, 4, 19, '2024-04-14', '13:00:00', 'Problema urológico', 'pendiente'),
        (35, 5, 20, '2024-04-15', '11:00:00', 'Revisión ginecológica', 'pendiente'),
        (36, 6, 1, '2024-04-16', '09:00:00', 'Cardiología seguimiento', 'pendiente'),
        (37, 7, 2, '2024-04-17', '14:30:00', 'Revisión dermatológica', 'pendiente'),
        (38, 8, 3, '2024-04-18', '10:00:00', 'Neuro seguimiento', 'pendiente'),
        (39, 9, 4, '2024-04-19', '11:30:00', 'Oftalmología control', 'pendiente'),
        (40, 10, 5, '2024-04-20', '15:00:00', 'ORL revisión', 'pendiente'),
        (41, 11, 6, '2024-02-28', '09:00:00', 'Control de presión', 'cancelada'),
        (42, 12, 7, '2024-03-01', '10:30:00', 'Revisión de piel', 'cancelada'),
        (43, 13, 8, '2024-03-01', '14:00:00', 'Consulta neurológica', 'cancelada'),
        (44, 14, 9, '2024-03-02', '15:30:00', 'Examen oftalmológico', 'cancelada'),
        (45, 15, 10, '2024-03-03', '11:00:00', 'Revisión ORL', 'cancelada'),
        (46, 16, 11, '2024-03-04', '09:30:00', 'Gastroenterología', 'cancelada'),
        (47, 17, 12, '2024-03-05', '13:00:00', 'Neumología', 'cancelada'),
        (48, 18, 13, '2024-03-06', '10:00:00', 'Endocrinología', 'cancelada'),
        (49, 19, 14, '2024-03-07', '14:30:00', 'Urología', 'cancelada'),
        (50, 20, 15, '2024-03-08', '11:30:00', 'Psiquiatría', 'cancelada'),
        (51, 21, 1, '2024-03-09', '09:00:00', 'Ginecología', 'cancelada'),
        (52, 22, 2, '2024-03-10', '15:00:00', 'Traumatología', 'cancelada'),
        (53, 23, 3, '2024-03-11', '10:30:00', 'Reumatología', 'cancelada'),
        (54, 24, 4, '2024-03-12', '11:00:00', 'Oncología', 'cancelada'),
        (55, 25, 5, '2024-03-13', '09:30:00', 'Pediatría', 'cancelada'),
        (56, 26, 6, '2024-03-14', '14:00:00', 'Cardiología', 'cancelada'),
        (57, 27, 7, '2024-03-15', '10:00:00', 'Dermatología', 'cancelada'),
        (58, 28, 8, '2024-03-16', '13:30:00', 'Neurología', 'cancelada'),
        (59, 29, 9, '2024-03-17', '09:00:00', 'Oftalmología', 'cancelada'),
        (60, 30, 10, '2024-03-18', '15:00:00', 'Otorrinolaringología', 'cancelada')
      `);

      // 7. Insert Receta
      await this.dataSource.query(`
        INSERT INTO "receta" ("id", "cita_id", "medicamento", "dosis", "instruccion", "fecha_emision") VALUES
        (1, 1, 'Enalapril', '10mg', 'Tomar una tableta cada día por la mañana', '2024-03-01 09:30:00'),
        (2, 1, 'Atorvastatina', '20mg', 'Tomar una tableta cada noche', '2024-03-01 09:30:00'),
        (3, 2, 'Clindamicina', '150mg', 'Aplicar crema tres veces al día', '2024-03-02 11:00:00'),
        (4, 3, 'Sumatriptán', '50mg', 'Tomar al inicio del dolor de cabeza, máximo 2 veces por semana', '2024-03-03 11:30:00'),
        (5, 3, 'Paracetamol', '500mg', 'Tomar cada 6 horas si es necesario', '2024-03-03 11:30:00'),
        (6, 4, 'Lubricante ocular', 'Gotas', 'Aplicar 2 gotas en cada ojo 3 veces al día', '2024-03-04 14:30:00'),
        (7, 5, 'Mometasona', 'Spray nasal', 'Aplicar 2 sprays en cada fosa nasal una vez al día', '2024-03-05 16:00:00'),
        (8, 5, 'Loratadina', '10mg', 'Tomar una tableta cada día', '2024-03-05 16:00:00'),
        (9, 6, 'Omeprazol', '20mg', 'Tomar una cápsula cada mañana antes del desayuno', '2024-03-06 10:00:00'),
        (10, 6, 'Metoclopramida', '10mg', 'Tomar media tableta 30 minutos antes de las comidas', '2024-03-06 10:00:00'),
        (11, 7, 'Bromhexina', '8mg', 'Tomar una tableta 3 veces al día', '2024-03-07 13:30:00'),
        (12, 8, 'Metformina', '850mg', 'Tomar una tableta dos veces al día con las comidas', '2024-03-08 10:30:00'),
        (13, 9, 'Tamsulosina', '0.4mg', 'Tomar una cápsula cada noche', '2024-03-09 15:00:00'),
        (14, 10, 'Sertralina', '50mg', 'Tomar una tableta cada mañana', '2024-03-10 12:00:00'),
        (15, 11, 'Vitaminas prenatales', 'Completo', 'Tomar un comprimido cada mañana', '2024-03-11 09:30:00'),
        (16, 12, 'Ibuprofeno', '400mg', 'Tomar cada 8 horas durante 5 días', '2024-03-12 15:30:00'),
        (17, 12, 'Diclofenaco', 'Gel', 'Aplicar localmente 3 veces al día', '2024-03-12 15:30:00'),
        (18, 13, 'Glucosamina', '1500mg', 'Tomar un comprimido al día', '2024-03-13 11:00:00'),
        (19, 14, 'Amlodipina', '5mg', 'Tomar una tableta cada día', '2024-03-14 11:30:00'),
        (20, 15, 'Peróxido de benzoilo', 'Crema 5%', 'Aplicar una vez al día por la noche', '2024-03-15 10:00:00'),
        (21, 16, 'Propranolol', '80mg', 'Tomar una tableta cada 12 horas', '2024-03-16 14:30:00'),
        (22, 17, 'Timolol', 'Gotas 0.5%', 'Aplicar una gota en cada ojo dos veces al día', '2024-03-17 10:30:00'),
        (23, 18, 'Amoxicilina', '500mg', 'Tomar una cápsula cada 8 horas durante 7 días', '2024-03-18 14:00:00'),
        (24, 19, 'Ranitidina', '150mg', 'Tomar una tableta dos veces al día', '2024-03-19 09:30:00'),
        (25, 20, 'Albuterol', 'Inhalador', 'Usar 2 inhalaciones cada 4-6 horas según sea necesario', '2024-03-20 15:30:00'),
        (26, 21, 'Levotiroxina', '75mcg', 'Tomar una tableta cada mañana en ayunas', '2024-03-21 11:00:00'),
        (27, 22, 'Finasterida', '1mg', 'Tomar una tableta cada día', '2024-03-22 14:30:00'),
        (28, 23, 'Paroxetina', '20mg', 'Tomar una tableta cada mañana', '2024-03-23 11:30:00'),
        (29, 24, 'Hierro', '325mg', 'Tomar una tableta cada día con jugo de naranja', '2024-03-24 10:00:00'),
        (30, 25, 'Naproxeno', '500mg', 'Tomar una tableta cada 8-12 horas con alimentos', '2024-03-25 15:30:00')
      `);

      return { message: 'Database successfully seeded!' };
    } catch (error) {
      throw error;
    }
  }
}