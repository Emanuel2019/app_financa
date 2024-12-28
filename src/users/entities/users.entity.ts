import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
; import { Conta } from '../../conta/entities/conta.entity'; 
@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  username: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
  @OneToMany(() => Conta, conta => conta.user) contas: Conta[];
}
