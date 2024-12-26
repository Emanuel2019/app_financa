// import { Controller, Post, Body } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { emit } from 'process';

// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @Post('login')
//   async login(@Body() loginDto: { email: string; password: string }) {
//   console.log(loginDto);
//     // Verificar usuário no banco e validar senha
//     // Retornar JWT
//   }

//   @Post('register')
//   async register(@Body() registerDto: { email: string; password: string }) {
//     // Criar usuário no banco com senha hash
//   }
// }


import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Request,
  UseGuards
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
@ApiTags('Login') 
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login para acesso no sistema' })
  async login(@Body() loginDto: loginDto) {
    return this.authService.signIn(loginDto);
}

 
}

