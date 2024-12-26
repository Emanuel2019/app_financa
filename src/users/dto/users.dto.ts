import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, MaxLength } from "class-validator";
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
//import { IsEmailUnique } from '../validador/emailIsUnique';
export class UsersDto {
  @PrimaryGeneratedColumn()
    id: number;
    @ApiProperty({
      description: `Nome do usuário`,
      example: 'Emanuel Ngola',
  })
    @IsString()
    @MinLength(3,{message:'O nome deve ter no minimo 3 caracteres'})
    @MaxLength(255,{message:'O nome deve ter no maximo 255 caracteres'})
    @Column()
    name: string;
    @ApiProperty({
      description: `Username do usuário`,
      example: 'Engola',
  })
    @IsString()
    @MinLength(3,{message:'O nome deve ter no minimo 3 caracteres'})
    @MaxLength(255,{message:'O nome deve ter no maximo 255 caracteres'})
    @Column()
    username: string;
    @ApiProperty({
      description: `Email do usuario para aceder na sua conta`,
      example: 'emanuelngola@gmail.com',
  })
    @IsEmail({}, { message: 'E-mail inválido.' })
    @Column()
    email: string;
    @ApiProperty({
      description: `A senha do  usuário para aceder na sua conta`,
      example: '123456',
  })
    @IsString()
    @MinLength(6, { message: 'A password deve ter pelo menos 6 caracteres.' })
    @Column()
    password: string;
    @Column()
    created_at: Date;
    @Column()
    updated_at: Date;
    
}