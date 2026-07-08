import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCitaDto } from './dto/create-cita.dto';
import { UpdateCitaDto } from './dto/update-cita.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cita } from './entities/cita.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CitasService {

  constructor(
    @InjectRepository(Cita)
    private readonly citaRepository: Repository<Cita>,
  ) {}
  async create(createCitaDto: CreateCitaDto) {

    try {

      const citas = this.citaRepository.create(createCitaDto);
      await this.citaRepository.save( citas );

      return citas;

    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException('Ayuda!')
    }

    return 'This action adds a new cita';
  }

  findAll() {
    return this.citaRepository.find();
  }

  findOne(id: number) {
    return this.citaRepository.findOne({where: {id}});
  }

  update(id: number, updateCitaDto: UpdateCitaDto) {
    return `This action updates a #${id} cita`;
  }

  remove(id: number) {
    return `This action removes a #${id} cita`;
  }




  async getPendientes() {
    return await this.citaRepository
      .createQueryBuilder('cita')
      .innerJoin('cita.paciente', 'paciente')
      .innerJoin('cita.doctor', 'doctor')
      .select([
        'paciente.nombre',
        'doctor.nombre',
        'cita.fecha',
        'cita.hora',
      ])
      .where('cita.estado = :estado', {
        estado: 'pendiente',
      })
      .getRawMany();
  }

  async getMarzoControl() {
    return await this.citaRepository
      .createQueryBuilder('cita')
      .where('cita.fecha BETWEEN :inicio AND :fin', {
        inicio: '2024-03-01',
        fin: '2024-03-30',
      })
      .andWhere('LOWER(cita.motivo_consulta) LIKE LOWER(:motivo)', {
        motivo: '%control%',
      })
      .getMany();
  }

}
