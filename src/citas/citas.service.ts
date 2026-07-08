import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { Cita } from './entities/cita.entity';

@Injectable()
export class CitasService {
  constructor(
    @InjectRepository(Cita)
    private readonly citaRepository: Repository<Cita>,
  ) {}
  create(createCitaDto: CreateCitaDto) {
    return 'This action adds a new cita';
  }

  findAll() {
    return `This action returns all citas`;
  }

  async getPendientes() {
    return await this.citaRepository
      .createQueryBuilder('cita')
      .innerJoin('cita.paciente', 'paciente').innerJoin('cita.doctor', 'doctor')
      .select(['paciente.nombre','doctor.nombre','cita.fecha','cita.hora',])
      .where('cita.estado = :estado', {estado: 'pendiente',}).getRawMany();
  }

  async getMarzoControl() {
    return await this.citaRepository
      .createQueryBuilder('cita')
      .where('cita.fecha BETWEEN :inicio AND :fin', {inicio: '2024-03-01',fin: '2024-03-30',})
      .andWhere('LOWER(cita.motivo_consulta) LIKE LOWER(:motivo)', {motivo: '%control%',})
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} cita`;
  }

  update(id: number, updateCitaDto: UpdateCitaDto) {
    return `This action updates a #${id} cita`;
  }

  remove(id: number) {
    return `This action removes a #${id} cita`;
  }
}
