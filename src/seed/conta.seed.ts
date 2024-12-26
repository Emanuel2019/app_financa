import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Conta } from '../conta/entities/conta.entity'; 

@Injectable()
export class ContaSeeder {
  constructor(private readonly dataSource: DataSource) {}

  async run(): Promise<void> {
    const contaRepository = this.dataSource.getRepository(Conta);

    const contas = [
      { tipo: 'poupanca', saldo: 2500, userId: 1,numero_conta:'12202412230445566633',IBAN:'AO00001212202412230445566633',active:1 },
      { tipo: 'prazo', saldo: 2500, userId: 2,numero_conta:'1220241223',IBAN:'AO0000121220241223',active:1 },
      { tipo: 'poupanca', saldo: 2500, userId: 3,numero_conta:'1220241223153810',IBAN:'AO0000121220241223153810',active:1 },
    ];

    await contaRepository.save(contas);
    console.log('Contas bancárias adicionadas com sucesso!');
  }
}
