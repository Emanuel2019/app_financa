import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContaController } from './conta.controller';
import { ContaService } from './conta.service';
import { Conta } from './entities/conta.entity';
import { UsersModule } from '../users/users.module';
import { HistoricosModule } from 'src/historicos/historicos.module';
@Module({
  imports: [TypeOrmModule.forFeature([Conta]),UsersModule,HistoricosModule],
  controllers: [ContaController],
  providers: [ContaService],
  exports: [ContaService],
})
export class ContaModule {}
