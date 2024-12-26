import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/users.entity';
import { UsersDto } from './dto/users.dto';
import { isEmail } from 'class-validator';
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>
  ) { }
 
  async create(UsersDto: UsersDto) {
    const saltOrRounds = 10;
    UsersDto.password = await bcrypt.hash(UsersDto.password, saltOrRounds);
    return this.UserRepository.save(UsersDto);

  }

  async findOne(email: string): Promise<User | undefined> {
    if (!email || !isEmail(email)) {
      throw new Error('Email inválido');
    }

    const user = await this.UserRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    return user;
  }

  async findAll() {
    try {
      return await this.UserRepository.find({});
    } catch (err) {
      return err;
    }
  }
  async findById(id: number): Promise<User | undefined> {
    try {
      return await this.UserRepository.findOne({ where: { id } });
    } catch (err) {
      return err;
    }

  }
  async update(id: number, UsersDto: UsersDto) {
    const user = await this.UserRepository.findOneBy({ id });
    if (!user) {
      throw new Error('User not found');
    }

    if (UsersDto.password) {
      const saltOrRounds = 10;
      UsersDto.password = await bcrypt.hash(UsersDto.password, saltOrRounds);
    }

    Object.assign(user, UsersDto);

    return this.UserRepository.save(user);
  }
  async delete(id: number) {
    const user=await this.UserRepository.findOne({where:{id}})
    if(!user){
      throw new NotFoundException("Esse usuário não existe...");
    }
    await this.UserRepository.delete(id)
    return user;
  }
}