import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/users.entity';
import { Movimentacao } from '../../movimentacao/entities/movimentacao.entity';

@Entity()
export class Conta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['poupança', 'prazo'],
  })
  tipo: string;

  @Column('decimal', { precision: 15, scale: 2 })
  saldo: number;

  @Column({ unique: true })
  numero_conta: string;

  @Column({ unique: true })
  IBAN: string;
  @Column()
  active: number;
  @ManyToOne(() => User, user => user.contas, { eager: true }) 
  user: User;

  @OneToMany(() => Movimentacao, movimentacao => movimentacao.conta)
  movimentacoes: Movimentacao[];
}
