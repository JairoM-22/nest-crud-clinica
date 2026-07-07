import { Injectable } from '@nestjs/common';
import { CreateEspecialidadDto } from './dto/create-especialidad.dto';
import { UpdateEspecialidadDto } from './dto/update-especialidad.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Especialidad } from './entities/especialidad.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EspecialidadService {

  constructor(
    @InjectRepository(Especialidad)
    private readonly especialidadRepository: Repository<Especialidad>
  ){}


  create(createEspecialidadDto: CreateEspecialidadDto) {
    return 'This action adds a new especialidad';
  }

  findAll() {
    return `This action returns all especialidad`;
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
}
