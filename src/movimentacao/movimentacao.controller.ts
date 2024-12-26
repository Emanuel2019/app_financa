import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UseGuards } from '@nestjs/common';
import { MovimentacaoService } from './movimentacao.service';
import { CreateMovimentacaoDto } from './dto/create-movimentacao.dto';
import { UpdateMovimentacaoDto } from './dto/update-movimentacao.dto';
import { AuthGuard } from '../env/auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
@ApiTags('Operações Bancárias')
@UseGuards(AuthGuard)
@Controller('movimentacao')
export class MovimentacaoController {
  constructor(private readonly movimentacaoService: MovimentacaoService) { }
  @ApiOperation({ summary: 'Registar operação bancária' })
  @Post()
  create(@Body() createMovimentacaoDto: CreateMovimentacaoDto) {
    return this.movimentacaoService.create(createMovimentacaoDto);
  }
  @ApiOperation({ summary: 'Listar todas operações bancárias' })
  @Get()
  findAll() {
    return this.movimentacaoService.findAll();
  }
  @ApiOperation({ summary: 'Visualizar operação bancária por id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movimentacaoService.findOne(+id);
  }

  @ApiOperation({ summary: 'Realizar transferência de valor' })
  @Post('transferir')
  async transferir(@Body() transferirDto: { conta_id_saque: number; conta_id_depositar: number; valor: number }) {
    const { conta_id_saque, conta_id_depositar, valor } = transferirDto;
    if (!conta_id_saque || !conta_id_depositar || valor <= 0) {
      throw new BadRequestException('Todos os campos são obrigatórios e o valor deve ser maior que zero.');
    }

    return await this.movimentacaoService.transferir(conta_id_saque, conta_id_depositar, valor);
  }

}
