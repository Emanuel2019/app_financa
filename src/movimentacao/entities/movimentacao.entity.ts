import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/users.entity';
import { Conta } from '../../conta/entities/conta.entity';

@Entity()
export class Movimentacao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ['deposito', 'levantamento', 'transferencia'],
  })
  tipo: string;
  @Column('decimal', { precision: 15, scale: 2 })
  valor: number;
  @ManyToOne(() => Conta, conta => conta.movimentacoes,{ eager: true })
  conta: Conta; 
}
