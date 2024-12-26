import { Injectable } from '@nestjs/common';
import { CreateHistoricoDto } from './dto/create-historico.dto';
import { UpdateHistoricoDto } from './dto/update-historico.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Historico } from './entities/historico.entity';
@Injectable()
export class HistoricosService {
  constructor(@InjectRepository(Historico)
  private readonly historicoRepository: Repository<Historico>,) { }
  async create(createHistoricoDto: CreateHistoricoDto): Promise<Historico> {
    const novoHistorico = this.historicoRepository.create(createHistoricoDto);
    return await this.historicoRepository.save(novoHistorico);
  }

  async findAll(): Promise<Historico[]> {
    return await this.historicoRepository.find({ order: { "id": "DESC" } });
  }

  async findOne(id: number): Promise<Historico> { return await this.historicoRepository.findOne({ where: { id } }); }


}
