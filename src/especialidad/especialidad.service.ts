import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
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
    return `This action returns a #${id} especialidad`;
  }

  update(id: number, updateEspecialidadDto: UpdateEspecialidadDto) {
    return `This action updates a #${id} especialidad`;
  }

  remove(id: number) {
    return `This action removes a #${id} especialidad`;
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
