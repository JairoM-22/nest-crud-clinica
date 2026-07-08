import { Injectable } from '@nestjs/common';
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
  create(createPacienteDto: CreatePacienteDto) {
    return 'This action adds a new paciente';
  }

  findAll() {
    return `This action returns all pacientes`;
  }

  async getTop5() {
    return await this.pacienteRepository
      .createQueryBuilder('paciente')
      .select([
        'paciente.nombre',
        'paciente.correo',
        'paciente.fechaRegistro',
      ])
      .orderBy('paciente.fechaRegistro', 'DESC')
      .take(5)
      .getMany();
  }

  async getSinCita() {
    return await this.pacienteRepository
      .createQueryBuilder('paciente')
      .leftJoin('paciente.citas', 'cita')
      .where('cita.id IS NULL')
      .select([
        'paciente.id',
        'paciente.nombre',
      ])
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} paciente`;
  }

  update(id: number, updatePacienteDto: UpdatePacienteDto) {
    return `This action updates a #${id} paciente`;
  }

  remove(id: number) {
    return `This action removes a #${id} paciente`;
  }
}
