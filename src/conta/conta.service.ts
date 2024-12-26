import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ContaDto } from './dto/conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Conta } from './entities/conta.entity';
import { UsersService } from '../users/users.service';
import Big from 'big.js';
import { CreateHistoricoDto } from 'src/historicos/dto/create-historico.dto';
import { HistoricosService } from 'src/historicos/historicos.service';
@Injectable()
export class ContaService {
  constructor(
    @InjectRepository(Conta)
    private readonly ContaRepository: Repository<Conta>,
    private readonly usersService: UsersService,
    private readonly historicoService: HistoricosService
  ) { }
  private async generateNumeroConta(): Promise<string> {
    const now = new Date();
    const newNumeroConta = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;
    const bankInitials = '12';

    return `${bankInitials}${newNumeroConta}`;
  }

  private async generateIBAN(numeroConta: string): Promise<string> {

    const countryCode = 'AO';
    const controlNumber = '00';
    const bankCode = '0012';
    const iban = `${countryCode}${controlNumber}${bankCode}${numeroConta}`;

    return iban;
  }

  async create(contaDto: ContaDto): Promise<Conta> {

    const existingAccount = await this.ContaRepository.findOne({ where: { user: { id: contaDto.user_id } } });
    if (existingAccount) {
      throw new BadRequestException('Usuário já possui uma conta.');
    }

    const numero_conta = await this.generateNumeroConta();
    const IBAN = await this.generateIBAN(numero_conta);

    const user = await this.usersService.findById(contaDto.user_id);
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const newConta = this.ContaRepository.create({ ...contaDto, numero_conta, IBAN, user });
    const createHistoricoDto: CreateHistoricoDto = {
      descricao: `Conta bancária do tipo ${newConta.tipo} criada com Número ${newConta.numero_conta} com valor ${newConta.saldo}. Cliente ${newConta.user.name} `,
      created_at: new Date(),
      update_at: new Date(),
      id: null
    };
    await this.historicoService.create(createHistoricoDto);
    return this.ContaRepository.save(newConta);
  }

  async findAll() {
    try {
      return await this.ContaRepository.find({ where: { active: 1 } });
    } catch (err) {
      throw new InternalServerErrorException('Erro ao buscar contas ativas', err.message);
    }
  }


  async findOne(id: number) {
    try {
      const conta = await this.ContaRepository.findOne({ where: { id, active: 1 } });
      if (!conta) {
        throw new NotFoundException(`Essa conta não existe ou está inativa.`);
      }
      return conta;
    } catch (err) {
      throw new InternalServerErrorException('Erro ao buscar a conta', err.message);
    }
  }

  async update(id: number, updateContaDto: UpdateContaDto): Promise<Conta> {

    const conta = await this.ContaRepository.findOne({ where: { id } });

    if (!conta) {
      throw new NotFoundException(`Conta com ID ${id} não encontrada`);
    }

    if (updateContaDto.tipo) {
      conta.tipo = updateContaDto.tipo;
    }

    if (updateContaDto.saldo !== undefined) {
      conta.saldo = updateContaDto.saldo;
    }
    
    const createHistoricoDto: CreateHistoricoDto = {
      descricao: `Conta bancária do tipo ${conta.tipo} actualizada com Número ${conta.numero_conta} com valor ${conta.saldo}. Cliente ${conta.user.name} `,
      created_at: new Date(),
      update_at: new Date(),
      id: null
    };
    await this.historicoService.create(createHistoricoDto);

    return this.ContaRepository.save(conta);
  }

  async remove(id: number): Promise<string> {
    try {
      const conta = await this.ContaRepository.findOne({ where: { id } });
      if (!conta) {
        throw new NotFoundException(`Essa conta não existe...`);
      }

      await this.ContaRepository.delete(id);
      return `Essa conta  foi removida com sucesso.`;
    } catch (err) {
      throw new InternalServerErrorException(`Erro ao remover a conta: ${err.message}`);
    }
  }
  async desativar(id: number) {
    try {
      
      const conta = await this.ContaRepository.findOne({ where: { id, active: 1 } });
      
      if (!conta) {
        throw new NotFoundException(`A conta ${conta.numero_conta} não foi encontrada ou já está desativada.`);
      }
  
      conta.active = 0;
      await this.ContaRepository.save(conta);
  
      return {
        sucesso: true,
        mensagem: `A conta  ${conta.numero_conta} foi desativada com sucesso.`,
        conta,
      };
    } catch (err) {
      
      throw new InternalServerErrorException(`Erro ao desativar a conta: ${err.message}`);
    }
  }
  async ativar(id: number) {
    try {
      
      const conta = await this.ContaRepository.findOne({ where: { id, active: 0 } });
      
      if (!conta) {
        throw new NotFoundException(`A conta ${conta.numero_conta} não foi encontrada ou já está ativada.`);
      }
  
      conta.active = 1;
      await this.ContaRepository.save(conta);
  
      return {
        sucesso: true,
        mensagem: `A conta  ${conta.numero_conta} foi ativada com sucesso.`,
        conta,
      };
    } catch (err) {
      
      throw new InternalServerErrorException(`Erro ao desativar a conta: ${err.message}`);
    }
  }
  async sacar(id: number, valor: number): Promise<void> {
    try {
      let conta = await this.ContaRepository.findOne({ where: { id, active: 1 } });

      if (!conta) {
        throw new NotFoundException(`Essa conta não encontrada ou já está desativada.`);
      }

      const saldoAtual = new Big(conta.saldo);
      const valorSaque = new Big(valor);
      const novoSaldo = saldoAtual.minus(valorSaque);

      conta.saldo = novoSaldo.toNumber();
      
      await this.ContaRepository.save(conta);
    } catch (error) {
      throw new InternalServerErrorException(`Erro ao sacar o dinheiro: ${error.message}`);
    }
  }

  async deposito(id: number, valor: number): Promise<void> {
    try {
      let conta = await this.ContaRepository.findOne({ where: { id, active: 1 } });

      if (!conta) {
        throw new NotFoundException(`Essa conta não encontrada ou já está desativada.`);
      }

      const saldoAtual = new Big(conta.saldo);
      const valorDeposito = new Big(valor);
      const novoSaldo = saldoAtual.plus(valorDeposito);
      conta.saldo = novoSaldo.toNumber();
      await this.ContaRepository.save(conta);
    } catch (error) {
      throw new InternalServerErrorException(`Erro ao depositar o dinheiro: ${error.message}`);
    }

  }
 
  async transferencia(contaSaque_id: number, contaDeposito_id: number, valor: number): Promise<void> {
    const contaSaque = await this.ContaRepository.findOne({ where: { id: contaSaque_id } });
    const contaDeposito = await this.ContaRepository.findOne({ where: { id: contaDeposito_id } });

    if (!contaSaque || !contaDeposito) {
      throw new NotFoundException('Uma ou ambas as contas não foram encontradas.');
    }

    const saldoContaSaque = new Big(contaSaque.saldo);
    const saldoContaDeposito = new Big(contaDeposito.saldo);
    const valorTransferencia = new Big(valor);
    contaSaque.saldo = saldoContaSaque.minus(valorTransferencia).toNumber();
    contaDeposito.saldo = saldoContaDeposito.plus(valorTransferencia).toNumber();
    await this.ContaRepository.save(contaSaque);
    await this.ContaRepository.save(contaDeposito);
  }  

}
