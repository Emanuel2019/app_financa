import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ENV as env } from './env/env';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContaModule } from './conta/conta.module';
import { MovimentacaoModule } from './movimentacao/movimentacao.module';
import { MovimentacaoWorkerModule } from './movimentacao/movimentacao.worker.module';
import { HistoricosModule } from './historicos/historicos.module';
import { UserSeeder } from './seed/user.seed';
@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot(env.database),
    ContaModule,
    MovimentacaoModule,
    MovimentacaoWorkerModule,
    HistoricosModule,
    
  ],
  //controllers: [AppController],
  providers: [AppService,UserSeeder],
})
export class AppModule {}
