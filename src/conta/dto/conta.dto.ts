import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
export class ContaDto {
    @PrimaryGeneratedColumn()
    id: number
    @ApiProperty({
        description: `Tipo de conta para abertura`,
        example: 'Poupança ou prazo',
    })
    @Column()
    tipo: 'poupança' | 'prazo';
    @ApiProperty({ description: 'Saldo na conta do usuário', example: '1000' })
    @Column()
    saldo: number;
    @ApiProperty({ description: 'Número da conta do usuário', example: '12202412230445566633' })
    @Column()
    numero_conta: string;
    @ApiProperty({ description: 'Número interbancario do usuario', example: 'AO00001212202412230445566633' })
    @Column()
    IBAN: string;
    @ApiProperty({ description: 'O id do usuário', example: 'AO00001212202412230445566633' })
    @Column()
    user_id: number;
    @Column()
    active: number;
}