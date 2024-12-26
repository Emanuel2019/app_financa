export class CreateContaDto {
    id:number
    tipo: 'poupança' | 'prazo';
    saldo:number;
    numero_conta:string;
    IBAN:string;
    user_id:number;
    active:number;
}
