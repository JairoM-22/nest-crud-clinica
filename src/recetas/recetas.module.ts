import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetasService } from './recetas.service';
import { RecetasController } from './recetas.controller';
import { Receta } from './entities/receta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receta])],
  controllers: [RecetasController],
  providers: [RecetasService],
  exports: [TypeOrmModule],
})
export class RecetasModule {}
