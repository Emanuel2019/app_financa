import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ContaService } from './conta.service';
import { ContaDto } from './dto/conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { AuthGuard } from '../env/auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
@ApiTags('Contas Bancária')
@UseGuards(AuthGuard)
@Controller('conta')
export class ContaController {
  constructor(private readonly contaService: ContaService) { }
  @ApiOperation({ summary: 'Registo de conta bancária do sistema' })
  @Post()
  create(@Body() ContaDto: ContaDto) {
    return this.contaService.create(ContaDto);
  }
  @ApiOperation({ summary: 'Listar todas as contas bancária' })
  @Get()
  findAll() {
    return this.contaService.findAll();
  }
  @ApiOperation({ summary: 'Listar conta bancária por id' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contaService.findOne(+id);
  }
  @ApiOperation({ summary: 'Atualizar o registro da conta bancária' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContaDto: UpdateContaDto) {
    return this.contaService.update(+id, updateContaDto);
  }
  @ApiOperation({ summary: 'Excluir o registro de conta bancária' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contaService.remove(+id);
  }
  @ApiOperation({ summary: 'Desativar a conta bancária' })
  @Put('desativar/:id')
  ativar(@Param('id') id: number) {
    return this.contaService.desativar(id);
  }
  @ApiOperation({ summary: 'Ativar a conta bancária' })
  @Put('ativar/:id')
  desativar(@Param('id') id: number) {
    return this.contaService.ativar(id);
  }
}
