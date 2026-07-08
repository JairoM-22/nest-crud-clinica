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
    private readonly citaRepository: Repository<Cita>
  ){}
  
  create(createCitaDto: CreateCitaDto) {

    try {
      
      
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
}
