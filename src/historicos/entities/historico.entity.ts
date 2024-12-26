import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
@Entity('historicos')
export class Historico {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    descricao:string;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at:Date;
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    update_at:Date;
}
