import { NestFactory } from '@nestjs/core';
import { MovimentacaoWorkerModule } from './movimentacao.worker.module';
import { Worker } from 'bullmq';
import { redisConnection } from '../bullmq/bullmq.config';
import{MovimentacaoService} from'./movimentacao.service';
import { ContaService } from '../conta/conta.service';
async function bootstrapWorker() {
  const app = await NestFactory.createApplicationContext(MovimentacaoWorkerModule);
  const contaService = app.get(ContaService);
  const MovimentacaoRepository = app.get(MovimentacaoService);
  
  const MovimentacaoWorker = new Worker(
    'transactions',
    async (job) => {
      const { conta_id, tipo, valor } = job.data;
      try {
        if (tipo === 'deposito') {
          await contaService.deposito(conta_id, valor);
        } else if (tipo === 'levantamento') {
          await contaService.sacar(conta_id, valor);
        }
        MovimentacaoRepository.create(job.data);
        console.log(`Movimentação processada: ${tipo} de ${valor} para a conta ${conta_id}`);
      } catch (error) {
        console.error(`Erro ao processar movimentação: ${error.message}`);
      }
    },
    { connection: redisConnection },
  );

  console.log('Worker iniciado e aguardando tarefas...');
}

bootstrapWorker();
