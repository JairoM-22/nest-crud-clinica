import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { Paciente } from './entities/paciente.entity';

@Injectable()
export class PacientesService {
  constructor(
    @InjectRepository(Paciente)
    private readonly pacienteRepository: Repository<Paciente>,
  ) {}
  async create(createPacienteDto: CreatePacienteDto) {
      const paciente = this.pacienteRepository.create(createPacienteDto)
      return await this.pacienteRepository.save(paciente)
  }

  async findAll() {
    return this.pacienteRepository.find() ;
  }

  async getTop5() {
    return await this.pacienteRepository
      .createQueryBuilder('paciente').select(['paciente.nombre','paciente.correo','paciente.fechaRegistro',]).orderBy('paciente.fechaRegistro', 'DESC').take(5).getMany();
  }

  async getSinCita() {
    return await this.pacienteRepository.createQueryBuilder('paciente').leftJoin('paciente.citas', 'cita')
      .where('cita.id IS NULL').select(['paciente.id','paciente.nombre',]).getMany();
  }

  async findOne(id: number) {
  return await this.pacienteRepository.findOne({where: { id },});
}

 async update(id: number, updatePacienteDto: UpdatePacienteDto) {
    const paciente = await this.pacienteRepository.preload({id,...updatePacienteDto})
    if (!paciente){
        throw new NotFoundException(`Paciente ${id} no encontrado`);
    }
    return await this.pacienteRepository.save(paciente)
  }

 async remove(id: number) {
    await this.pacienteRepository.delete(id);

  return {
    message: 'Doctor eliminado',
  };
  }
}
