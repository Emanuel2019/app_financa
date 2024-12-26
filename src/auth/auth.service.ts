
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { loginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}
  async signIn(loginDto: loginDto): Promise<{ access_token: string }> {
   
    const user = await this.usersService.findOne(loginDto.email);
   
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
        throw new UnauthorizedException('Usuário inválido....');
    }
    const payload = { id: user.id,name:user.name, username: user.username,email:user.email };
    return {
        access_token: await this.jwtService.signAsync(payload),
    };
}


}
