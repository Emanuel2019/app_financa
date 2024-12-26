import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Movimentacao } from '../movimentacao/entities/movimentacao.entity'; 

@Injectable()
export class MovimentacaoSeeder {
  constructor(private readonly dataSource: DataSource) {}

  async run(): Promise<void> {
    const contaRepository = this.dataSource.getRepository(Movimentacao);

    const movimentacao = [
      { tipo: 'deposito', valor:100, contaId: 1 },
      { tipo: 'transferencia', valor:100, contaId: 2 },
      { tipo: 'levantamento', valor:100, contaId: 3 },
    ];

    await contaRepository.save(movimentacao);
    console.log('Operações bancárias realizadas com sucesso!');
  }
}
