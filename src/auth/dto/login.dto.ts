import { ApiProperty } from '@nestjs/swagger';
export class loginDto {
    @ApiProperty({
        description: `Email do usuario para aceder na sua conta`,
        example: 'seuemaiil@gmail.com',
    })
    email: string;
    @ApiProperty({
        description: `A senha do  usuário para aceder na sua conta`,
        example: '123456',
    })
    password: string
}