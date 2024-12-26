import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovimentacaoController } from './movimentacao.controller';
import { MovimentacaoService } from './movimentacao.service';
import { Movimentacao } from './entities/movimentacao.entity';
import { ContaModule } from '../conta/conta.module';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { HistoricosModule } from 'src/historicos/historicos.module';
@Module({
  imports: [TypeOrmModule.forFeature([Movimentacao]),ContaModule,UsersModule,AuthModule,HistoricosModule],
  controllers: [MovimentacaoController],
  providers: [MovimentacaoService],
  exports: [MovimentacaoService],
})
export class MovimentacaoModule {}
