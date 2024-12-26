
import { ApiProperty } from '@nestjs/swagger';
export class MovimentacaoDto {
  id: number;
  @ApiProperty({
    description:'Tipo de operação bancária',
    example:['deposito','saque','transferencia']
  })
  tipo: 'deposito' | 'levantamento' | 'transferencia';
  @ApiProperty({
    description:'Valor da operação bancária',
    example:'1000'
  })
  valor: number;
  @ApiProperty({description:'ID da conta bancária operacionada',example:'2'})
  conta_id: number;

}