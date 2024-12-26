import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimentacao } from './entities/movimentacao.entity';
import { MovimentacaoService } from './movimentacao.service';
import { ContaService } from '../conta/conta.service';
import { Conta } from '../conta/entities/conta.entity';
import { ContaModule } from 'src/conta/conta.module';
import { MovimentacaoModule } from './movimentacao.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { HistoricosModule } from 'src/historicos/historicos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movimentacao, Conta]),
    ContaModule, MovimentacaoModule,UsersModule,AuthModule,HistoricosModule
  ],
  providers: [MovimentacaoService, ContaService],
})
export class MovimentacaoWorkerModule {}
