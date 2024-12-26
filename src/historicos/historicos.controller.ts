import { Controller, Get, Param } from '@nestjs/common';
import { HistoricosService } from './historicos.service';
@Controller('historicos')
export class HistoricosController {
  constructor(private readonly historicosService: HistoricosService) {}

  @Get()
  findAll() {
    return this.historicosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historicosService.findOne(+id);
  }

  
}
