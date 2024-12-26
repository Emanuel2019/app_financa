import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '../users/entities/users.entity'; 

@Injectable()
export class UserSeeder {
  constructor(private readonly dataSource: DataSource) {}

  async run(): Promise<void> {
    const userRepository = this.dataSource.getRepository(User);

    const users = [
      { name: 'Emanuel Quitanda Ngola',username:'engola',password: '123456',email: 'emanuel.ngola@gmail.com',  },
      { name: 'Mariquinha da Silva Fragoso Ngola',username:'Neusa',password: '123456',email: 'neusa.ngola@gmail.com',  },
      { name: 'Melquisedeque Marcelino',username:'MelkNgola',password: '123456',email: 'melk.ngola@gmail.com',  },
      { name: 'Debóra Bibiana',username:'Bibi',password: '123456',email: 'bibiana.luamba@gmail.com',  },
      { name: 'Filipa Fragoso',username:'FilipaNgola',password: '123456',email: 'filipa.ngola@gmail.com',  },
      { name: 'Gideão Pedro',username:'Gideon',password: '123456',email: 'Gideon.Ngola@gmail.com',  },
      { name: 'Manuela Princesa',username:'Princesa',password: '123456',email: 'princesa.ngola@gmail.com',  },
      { name: 'Simão Marques',username:'Simon',password: '123456',email: 'simon.ngola@gmail.com',  },
    ];

    await userRepository.save(users);
    console.log('Usuários adicionados com sucesso!');
  }
}
