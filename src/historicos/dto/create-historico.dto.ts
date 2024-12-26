import { ApiProperty } from '@nestjs/swagger';
import { Column } from "typeorm";
export class CreateHistoricoDto {
    @Column()
    id:number;
    @Column()
    @ApiProperty({
        description: `Mostrar históricos das operações bancárias`,
    })
    descricao:string;
    @Column()
    created_at:Date;
    @Column()
    update_at:Date;
}
