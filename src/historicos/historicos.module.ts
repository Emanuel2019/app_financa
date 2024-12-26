import { Module } from '@nestjs/common';
import { HistoricosService } from './historicos.service';
import { HistoricosController } from './historicos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Historico } from './entities/historico.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([Historico])],
  controllers: [HistoricosController],
  providers: [HistoricosService],
  exports:[HistoricosService]
})
export class HistoricosModule {}
