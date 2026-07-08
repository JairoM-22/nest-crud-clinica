import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
  }

  findAll() {
    return this.citaRepository.find();
  }

  async findOne(id: number) {

    const cita = await this.citaRepository.findOne({where: {id}});

    if(!cita) throw new NotFoundException(`Product with ${ id } was not found ` );


    return cita;
  }

  async update(id: number, updateCitaDto: UpdateCitaDto) {

    const cita = await this.citaRepository.preload({
      id: id,
      ...updateCitaDto
    });

    if ( !cita ) throw new NotFoundException(`Product with ${ id } was not found ` );


    return  this.citaRepository.save( cita );
  }

  async remove(id: number) {
    const cita = await this.findOne(id);

    await this.citaRepository.remove( cita );
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

}
