import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ENV: { database: TypeOrmModuleOptions } = {
  database: {
    type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'teste_bank',
      autoLoadEntities: true,
      synchronize: false, 
  },
};
