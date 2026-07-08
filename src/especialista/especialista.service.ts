import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateEspecialistaDto } from './dto/create-especialista.dto';
import { UpdateEspecialistaDto } from './dto/update-especialista.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Especialista } from './entities/especialista.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EspecialistaService {

  private readonly logger = new Logger('EspecialistaService');

  constructor(
      @InjectRepository(Especialista)
      private readonly especialistaRepository: Repository<Especialista>
    ){}

  async create(createEspecialistaDto: CreateEspecialistaDto) {
    try {
      const especialista = this.especialistaRepository.create(createEspecialistaDto)
      await this.especialistaRepository.save(especialista)

      return especialista;
    } catch (error) {
        this.handleDBExceptions(error)
    }
  }

  findAll() {
    return this.especialistaRepository.find();
  }

  findOne(id: number) {
    return this.especialistaRepository.findOne({where: {id}});
  }

  async update(id: number, updateEspecialistaDto: UpdateEspecialistaDto) {
    
        const especialista = await this.especialistaRepository.preload({
          id: id,
          ...updateEspecialistaDto
        })
    
        if (!especialista) throw new NotFoundException(`Especialista con id: ${id} fue encontrado`)
    
        try {
          await this.especialistaRepository.save(especialista);
          return especialista;
        } catch (error) {
          this.handleDBExceptions(error)
        }
      }

  async remove(id: number) {
    const especialista = await this.findOne(id);
    if (!especialista) throw new NotFoundException(`Especialista con id: ${id} no fue encontrado`);
    await this.especialistaRepository.remove(especialista);
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
