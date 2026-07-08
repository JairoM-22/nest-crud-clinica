import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Get('citas')
  getCitas() {
    return this.doctorsService.getCitas();
  }

  @Get('estadisticas')
  getEstadisticas() {
    return this.doctorsService.getEstadisticas();
  }

  @Get('citas-sobre-promedio')
  getCitasSobrePromedio() {
    return this.doctorsService.getCitasSobrePromedio();
  }

  @Get('especialidad')
  getDoctoresPorEspecialidad() {
    return this.doctorsService.getDoctoresPorEspecialidad();
  }

  @Get()
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(+id);
  }
}
