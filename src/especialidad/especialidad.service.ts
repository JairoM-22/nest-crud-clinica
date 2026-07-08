import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateEspecialidadDto } from './dto/create-especialidad.dto';
import { UpdateEspecialidadDto } from './dto/update-especialidad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Especialidad } from './entities/especialidad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EspecialidadService {

  private readonly logger = new Logger('EspecialidadService');

  constructor(
    @InjectRepository(Especialidad)
    private readonly especialidadRepository: Repository<Especialidad>
  ){}


  async create(createEspecialidadDto: CreateEspecialidadDto) {
    try {
      const especialidad = this.especialidadRepository.create(createEspecialidadDto)
      await this.especialidadRepository.save( especialidad )

      return especialidad;
    } catch (error) {
        this.handleDBExceptions(error)
    }
  }

  findAll() {
    return this.especialidadRepository.find();
  }

  async getConMultiplesDoctores() {
    return await this.especialidadRepository
      .createQueryBuilder('especialidad').innerJoin('especialidad.especialista', 'especialista').select('especialidad.nombre', 'especialidad').addSelect('COUNT(especialista.id)', 'cantidadDoctores')
      .groupBy('especialidad.id').having('COUNT(especialista.id) >= :cantidad', {cantidad: 2,}).orderBy('cantidadDoctores', 'DESC').getRawMany();
  }

  findOne(id: number) {
    return this.especialidadRepository.findOne({where: {id}});
  }

  async update(id: number, updateEspecialidadDto: UpdateEspecialidadDto) {
  
      const especialidad = await this.especialidadRepository.preload({
        id: id,
        ...updateEspecialidadDto
      })
  
      if (!especialidad) throw new NotFoundException(`Especialidad con id: ${id} no fue encontrado`)
  
      try {
        await this.especialidadRepository.save(especialidad);
        return especialidad;
      } catch (error) {
        this.handleDBExceptions(error)
      }
    }

  async remove(id: number) {
    const especialidad = await this.findOne(id);
    if (!especialidad) throw new NotFoundException(`Especialidad con id: ${id} no fue encontrado`);
    await this.especialidadRepository.remove(especialidad);
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
