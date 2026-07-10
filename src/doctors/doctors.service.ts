import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { Cita } from '../citas/entities/cita.entity';

@Injectable()
export class DoctorsService {

  private readonly logger = new Logger('EspecialidadService');

  constructor(
    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,
  ) { }

  async create(createDoctorDto: CreateDoctorDto) {
    try {
      const doctor = this.doctorRepository.create(createDoctorDto)
      await this.doctorRepository.save(doctor)

      return doctor;
    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  findAll() {
    return this.doctorRepository.find();
  }

  async getCitas() {
    return await this.doctorRepository.manager.getRepository(Cita)
      .createQueryBuilder('cita').innerJoin('cita.doctor', 'doctor').select('doctor.nombre', 'doctor')
      .addSelect('COUNT(cita.id)', 'citas').groupBy('doctor.nombre')
      .orderBy('citas', 'DESC').getRawMany();
  }

  async getEstadisticas() {
  return this.doctorRepository
    .createQueryBuilder('doctor')
    .leftJoin('doctor.citas', 'cita')
    .leftJoin('cita.recetas', 'receta')
    .select([
      'doctor.id AS doctor_id',
      'doctor.nombre AS nombre_doctor',
    ])
    .addSelect('COUNT(DISTINCT cita.id)', 'total_citas')
    .addSelect('COUNT(receta.id)', 'total_medicamentos')
    .addSelect(
      'ROUND(COUNT(receta.id)::numeric / NULLIF(COUNT(DISTINCT cita.id),0),2)',
      'promedio_medicamentos_por_cita',
    )
    .addSelect('MAX(cita.fecha)', 'ultima_cita')
    .groupBy('doctor.id')
    .addGroupBy('doctor.nombre')
    .getRawMany();
}

  async getCitasSobrePromedio() {
    const subQuery = this.doctorRepository.manager.getRepository(Cita)
      .createQueryBuilder('c')
      .select('AVG(total)')
      .from(qb => {
        return qb
          .select('COUNT(cita.id)', 'total')
          .from(Cita, 'cita')
          .groupBy('cita.doctor_id');
      }, 'promedio');

    return await this.doctorRepository
      .createQueryBuilder('doctor').leftJoin('doctor.citas', 'cita').select(['doctor.id', 'doctor.nombre',])
      .addSelect('COUNT(cita.id)', 'totalCitas').groupBy('doctor.id')
      .having(`COUNT(cita.id) > (${subQuery.getQuery()})`).getRawMany();
  }

  async getDoctoresPorEspecialidad() {
    return this.doctorRepository
  .createQueryBuilder('doctor')
  .leftJoin('doctor.especialista', 'especialista')
  .leftJoin('especialista.especialidad', 'especialidad')
  .select([
    'doctor.id',
    'doctor.nombre',
    'especialidad.id',
    'especialidad.nombre',
  ])
  .getRawMany();
  }

  findOne(id: number) {
    return this.doctorRepository.findOne({ where: { id } });
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {

    const doctor = await this.doctorRepository.preload({
      id: id,
      ...updateDoctorDto
    })

    if (!doctor) throw new NotFoundException(`Doctor con id: ${id} no fue encontrado`)

    try {
      await this.doctorRepository.save(doctor);
      return doctor;
    } catch (error) {
      this.handleDBExceptions(error)
    }
  }

  async remove(id: number) {
    const doctor = await this.findOne(id);
    if (!doctor) throw new NotFoundException(`Doctor con id: ${id} no fue encontrado`);

    try {
      await this.doctorRepository.remove(doctor);
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  //HANDLE DATABASE EXCEPTIONS
  private handleDBExceptions(error: any) {

    if (error.code === '23505')
      throw new BadRequestException(error.detail);

    // Violación de llave foránea: el doctor todavía tiene citas y/o
    // especialidades asociadas, así que Postgres bloquea el borrado.
    if (error.code === '23503')
      throw new BadRequestException(
        'No se puede eliminar el doctor porque tiene citas y/o especialidades asociadas. Elimina o reasigna esos registros primero.'
      );

    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}
