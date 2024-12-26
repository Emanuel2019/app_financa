import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDto } from './dto/users.dto';
import { AuthGuard } from '../env/auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
@ApiTags('Usuários') 
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('register')
  @ApiOperation({ summary: 'Registo de usuário do sistema' })
async create(@Body() UsersDto: UsersDto): Promise<any> {
  try {
      
      const createdUser = await this.usersService.create(UsersDto);
      if (!createdUser) {
          throw new HttpException(
              'Erro ao criar a conta. Por favor, tente novamente mais tarde.',
              HttpStatus.INTERNAL_SERVER_ERROR
          );
      }

      return {
          success: true,
          message: 'Conta criada com sucesso!',
          data: createdUser,
      };
  } catch (error) {
    
      throw new HttpException(
          error.message || 'Ocorreu um erro ao processar sua solicitação.',
          error.status || HttpStatus.BAD_REQUEST
      );
  }
}
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Listar todos usuários do sistema' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Mostar um usuário do sistema' })
  @Get(":id")
  findById(@Param('id') id: number) {
    return this.usersService.findById(id);
  }
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Actualizar o registo do usuário no sistema' })
  @Put(":id")
  update(@Param('id') id: number, @Body() UsersDto: UsersDto) {
    return this.usersService.update(id, UsersDto);
  }
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Excluir um usuário no sistema' })
  @Delete(':id')
  async delete(@Param() params) {
    return await this.usersService.delete(params.id);
  }

}
