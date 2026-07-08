import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
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
  ) {}

  async create(createDoctorDto: CreateDoctorDto) {
      try {
        const doctor = this.doctorRepository.create(createDoctorDto)
        await this.doctorRepository.save( doctor )
  
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
    return await this.doctorRepository
      .createQueryBuilder('doctor').leftJoin('doctor.citas', 'cita').leftJoin('cita.recetas', 'receta')
      .select(['doctor.id','doctor.nombre',]).addSelect('COUNT(receta.id)', 'totalRecetas')
      .addSelect('AVG(receta.id)', 'promedioRecetas').addSelect('MAX(cita.fecha)', 'ultimaCita')
      .groupBy('doctor.id').getRawMany();
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
      .createQueryBuilder('doctor').leftJoin('doctor.citas', 'cita').select([    'doctor.id', 'doctor.nombre',])
      .addSelect('COUNT(cita.id)', 'totalCitas').groupBy('doctor.id')
      .having(`COUNT(cita.id) > (${subQuery.getQuery()})`).getRawMany();
  }

  async getDoctoresPorEspecialidad() {
    return await this.doctorRepository
      .createQueryBuilder('doctor').leftJoin('doctor.especialista', 'especialista').leftJoin('especialista.especialidad', 'especialidad').select(['doctor.id','doctor.nombre','especialidad.id','especialidad.nombre',])
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} doctor`;
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    return `This action updates a #${id} doctor`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctor`;
  }

  //HANDLE DATABASE EXCEPTIONS
  private handleDBExceptions( error: any ) {

    if ( error.code === '23505' )
      throw new BadRequestException(error.detail);
    
    this.logger.error(error)
    // console.log(error)
    throw new InternalServerErrorException('Unexpected error, check server logs');

  }
}
