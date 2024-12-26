import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
  import { Injectable } from '@nestjs/common';
  import { UsersService } from '../users.service';
  
  @ValidatorConstraint({ async: true })
  @Injectable()
  export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
    constructor(private readonly userService: UsersService) {}
  
    async validate(email: string): Promise<boolean> {
      // Verifica se o e-mail já existe na base de dados
     
      const user = await this.userService.findOne(email);
      return !user; // Retorna verdadeiro se o e-mail não existir
    }
  
    defaultMessage(): string {
      return 'Este e-mail já está em uso.';
    }
  }
  
  export function IsEmailUnique(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsEmailUniqueConstraint,
      });
    };
  }
  