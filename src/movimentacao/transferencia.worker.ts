// src/movimentacao/transfer.worker.ts
import { NestFactory } from '@nestjs/core';
import { MovimentacaoWorkerModule } from './movimentacao.worker.module';
import { Worker } from 'bullmq';
import { redisConnection } from '../bullmq/bullmq.config';
import { MovimentacaoService } from './movimentacao.service';

async function bootstrapWorker() {
  const app = await NestFactory.createApplicationContext(MovimentacaoWorkerModule);
  const movimentacaoService = app.get(MovimentacaoService);

  const transferWorker = new Worker(
    'transactions',
    async (job) => {
      const { conta_id_saque, conta_id_depositar, valor } = job.data;

      try {
        await movimentacaoService.transferir(conta_id_saque, conta_id_depositar, valor);
        console.log(`Transferência processada: ${valor} de ${conta_id_saque} para ${conta_id_depositar}`);
      } catch (error) {
        console.error(`Erro ao processar transferência: ${error.message}`);
      }
    },
    { connection: redisConnection },
  );

  console.log('Worker de transferência iniciado e aguardando tarefas...');
}

bootstrapWorker();
