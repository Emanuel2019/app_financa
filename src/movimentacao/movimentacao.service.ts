import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateMovimentacaoDto } from './dto/create-movimentacao.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Movimentacao } from './entities/movimentacao.entity';
import { ContaService } from '../conta/conta.service';
import { MovimentacaoQue } from '../bullmq/bullmq.config';
import { HistoricosService } from '../historicos/historicos.service'
import { CreateHistoricoDto } from '../historicos/dto/create-historico.dto';
@Injectable()
export class MovimentacaoService {
  constructor(
    @InjectRepository(Movimentacao)
    private readonly MovimentacaoRepository: Repository<Movimentacao>,
    private readonly contaService: ContaService,
    private readonly historicoService: HistoricosService
  ) { }
  async create(createMovimentacaoDto: CreateMovimentacaoDto) {
    const { conta_id, tipo, valor } = createMovimentacaoDto;

    try {
      await MovimentacaoQue.add('precesso-movimentacao', createMovimentacaoDto)
      const conta = await this.contaService.findOne(conta_id);
      if (!conta) {
        throw new NotFoundException(`Conta com ID ${conta_id} não encontrada ou está inativa.`);
      }

      if (tipo === 'deposito') {

        this.contaService.deposito(conta_id, valor);

      } else if (tipo === 'levantamento') {
        if (conta.saldo < valor) {
          throw new BadRequestException(`Saldo insuficiente para realizar ${tipo}.`);
        }
        this.contaService.sacar(conta_id, valor);
      } else {
        throw new BadRequestException(`Tipo de movimentação inválido: ${tipo}.`);
      }
      const movimentacao = this.MovimentacaoRepository.create({ ...createMovimentacaoDto, conta });
      const createHistoricoDto: CreateHistoricoDto = {
        descricao: `Movimentação do tipo ${tipo} realizada na conta ID ${conta.numero_conta} com valor ${valor}. Cliente ${conta.user.name},atendido por  `,
        created_at: new Date(),
        update_at: new Date(),
        id: null
      };
      await this.historicoService.create(createHistoricoDto);
      await this.MovimentacaoRepository.save(movimentacao);

      return {
        sucesso: "sim",
        mensagem: `Movimentação do tipo ${tipo} realizada com successo na conta ${conta.numero_conta} com valor ${valor}`,
        conta,
      };
    } catch (err) {
      throw new InternalServerErrorException(`Erro ao criar movimentação: ${err.message}`);
    }
  }
  async transferir(conta_id_saque: number, conta_id_depositar: number, valor: number) {
    try {
      const transferenciaData = {
        conta_id_saque,
        conta_id_depositar,
        valor
      };
      await MovimentacaoQue.add('processo-transferencia', transferenciaData)

      await this.contaService.transferencia(conta_id_saque, conta_id_depositar, valor);
      let data;
      if (conta_id_saque) {
        const conta = await this.contaService.findOne(conta_id_saque);
        if (!conta) {
          throw new NotFoundException(`Conta de saque com ID ${conta_id_saque} não encontrada ou inativa.`);
        }
        if (conta.saldo < valor) {
          throw new BadRequestException(`Saldo insuficiente na conta com ID ${conta_id_saque}.`);
        }
        const movimentacaoSaque = this.MovimentacaoRepository.create({ ...transferenciaData, conta });
        movimentacaoSaque.tipo = "levantamento";
        await this.MovimentacaoRepository.save(movimentacaoSaque);
        
        const createHistoricoDto: CreateHistoricoDto = {
          descricao: `Movimentação do tipo ${movimentacaoSaque.tipo} realizada na conta ID ${conta.numero_conta} com valor ${valor}. Cliente ${conta.user.name},atendido por  `,
          created_at: new Date(),
          update_at: new Date(),
          id: null
        };
        await this.historicoService.create(createHistoricoDto);
      }

      if (conta_id_depositar) {
        const conta = await this.contaService.findOne(conta_id_depositar);
        if (!conta) {
          throw new NotFoundException(`Conta de depósito com ID ${conta_id_depositar} não encontrada ou inativa.`);
        }
        if (conta.saldo < valor) {
          throw new BadRequestException(`Saldo insuficiente na conta com ID ${conta_id_saque}.`);
        }
        const movimentacaoDeposito = this.MovimentacaoRepository.create({ ...transferenciaData, conta });
        movimentacaoDeposito.tipo = "transferencia";
        data = movimentacaoDeposito;
        await this.MovimentacaoRepository.save(movimentacaoDeposito);
        
        const createHistoricoDto: CreateHistoricoDto = {
          descricao: `Movimentação do tipo ${movimentacaoDeposito.tipo} realizada na conta ID ${conta.numero_conta} com valor ${valor}. Cliente ${conta.user.name}`,
          created_at: new Date(),
          update_at: new Date(),
          id: null
        };
        await this.historicoService.create(createHistoricoDto);
      }

      return {
        sucesso:"Sim",
        mensagem: `Transferência de ${valor} realizada com sucesso`,
        data,
      };

    } catch (err) {
      throw new InternalServerErrorException(`Erro ao realizar transferência: ${err.message}`);
    }
  }
  async findAll() {
    try {
      return await this.MovimentacaoRepository.find({ order: { "id": "DESC" } });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar movimentações', error.message);
    }

  }

  async findOne(id: number) {
    try {
      const movimentacao = await this.MovimentacaoRepository.findOne({ where: { id } });
      if (!movimentacao || movimentacao === null) {
        throw new NotFoundException(`Essa operação não realizada.`);
      }
      return movimentacao;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao realizar a operação', error.message);
    }

  }


}
