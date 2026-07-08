import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRecetaDto } from './dto/create-receta.dto';
import { UpdateRecetaDto } from './dto/update-receta.dto';
import { Receta } from './entities/receta.entity';
import { Cita } from '../citas/entities/cita.entity';

@Injectable()
export class RecetasService {
  constructor(
    @InjectRepository(Receta)
    private readonly recetaRepository: Repository<Receta>,
  ) {}
  create(createRecetaDto: CreateRecetaDto) {
    return 'This action adds a new receta';
  }

  findAll() {
    return `This action returns all recetas`;
  }

  async removeCitasCanceladas() {
    const subQuery = this.recetaRepository.manager
      .createQueryBuilder(Cita, 'c')
      .select('c.id')
      .where('c.estado = :estado')
      .getQuery();

    return await this.recetaRepository
      .createQueryBuilder()
      .delete()
      .from(Receta)
      .where(`cita_id IN (${subQuery})`)
      .setParameter('estado', 'cancelada')
      .execute();
  }

  findOne(id: number) {
    return `This action returns a #${id} receta`;
  }

  update(id: number, updateRecetaDto: UpdateRecetaDto) {
    return `This action updates a #${id} receta`;
  }

  remove(id: number) {
    return `This action removes a #${id} receta`;
  }
}
