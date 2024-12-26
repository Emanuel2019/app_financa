import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UserSeeder } from './user.seed';
import { ContaSeeder } from './conta.seed';
import { MovimentacaoSeeder } from './movimentacao.seed';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const userSeeder = app.get(UserSeeder);
    const contaSeeder = app.get(ContaSeeder);
    const movimentacaoSeeder = app.get(MovimentacaoSeeder);
    await userSeeder.run();
    await contaSeeder.run();
    await movimentacaoSeeder.run();
    console.log('Seeds executados com sucesso!');
    await app.close();
}

bootstrap();
