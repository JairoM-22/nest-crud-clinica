import { Module } from '@nestjs/common';
import { EspecialistaService } from './especialista.service';
import { EspecialistaController } from './especialista.controller';

@Module({
  controllers: [EspecialistaController],
  providers: [EspecialistaService],
})
export class EspecialistaModule {}
