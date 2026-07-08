import { Body, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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

    async create(CreateRecetaDto: CreateRecetaDto) {
      try {

        const Receta = this.recetaRepository.create(CreateRecetaDto);
        await this.recetaRepository.save( Receta );
        return Receta;
      } catch (error) {
        console.log(error)
        throw new InternalServerErrorException('Ayuda!')
      }
    }

  findAll() {
    return this.recetaRepository.find();
  }

  async removeCitasCanceladas() {
    const subQuery = this.recetaRepository.manager
      .createQueryBuilder(Cita, 'c').select('c.id')
      .where('c.estado = :estado')
      .getQuery();

    return await this.recetaRepository
      .createQueryBuilder().delete()
      .from(Receta).where(`cita_id IN (${subQuery})`)
      .setParameter('estado', 'cancelada').execute();
  }

  async findOne(id: number) {
    const receta = await this.recetaRepository.findOne({where : {id}});

    if(!receta) throw new NotFoundException(`Receta with id ${ id } was not found`);

    return receta;
  }

  async update(id: number, updateRecetaDto: UpdateRecetaDto) {
    const receta = await this.recetaRepository.preload({
      id: id,
      ...updateRecetaDto
    })

    if(!receta) throw new NotFoundException(`Receta with id ${ id } was not found`);

    return this.recetaRepository.save(receta);
  }

  async remove(id: number) {
    const receta = await this.findOne( id );

    await this.recetaRepository.remove(receta);
  }
}
