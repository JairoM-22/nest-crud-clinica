import { Injectable } from '@nestjs/common';
import { CreateEspecialistaDto } from './dto/create-especialista.dto';
import { UpdateEspecialistaDto } from './dto/update-especialista.dto';

@Injectable()
export class EspecialistaService {
  create(createEspecialistaDto: CreateEspecialistaDto) {
    return 'This action adds a new especialista';
  }

  findAll() {
    return `This action returns all especialista`;
  }

  findOne(id: number) {
    return `This action returns a #${id} especialista`;
  }

  update(id: number, updateEspecialistaDto: UpdateEspecialistaDto) {
    return `This action updates a #${id} especialista`;
  }

  remove(id: number) {
    return `This action removes a #${id} especialista`;
  }
}
